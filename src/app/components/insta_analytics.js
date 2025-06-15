"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { use } from 'react';
import { CircularProgress } from '@mui/material';
import axios from '../lib/axios';
// Register ChartJS components
ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const InstagramAnalytics = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [processedData, setProcessedData] = useState(null);
  const [data,setData]=useState([])
  const [platform, setPlatform] = useState('instagram');
  useEffect(()=>{
    async function instaData(){
        try{
          let tempData=null
          if(platform=="twitter"){
            tempData=await axios.post("/twitter_all_data")
          }
          else if(platform=="instagram"){
             tempData=await axios.post("/instagram_all_data")
          }
          else if(platform=="facebook"){
             tempData=await axios.post("/fb_all_data")
          }
          else if(platform=="snapchat"){
            tempData=await axios.post("/snapchat_all_data")
         }
            if(tempData.status==200){
              console.log(tempData)
                console.log(tempData.data.data)
                setData(tempData.data.data)
            }
        }
        catch(e){
            console.log(e)
        }
    }
    instaData()
  },[platform])
  useEffect(() => {
    if (data && data.length > 0) {
      processData();
    }
  }, [data, timeRange]);
   const cleanLikesCount = (data) => {
  const raw = String(data).replace(/,/g, '').trim();
  
  // if (!/^\d+$/.test(raw)) {
  //   console.log('Invalid likes_count:', data?.likes_count);
  //   return 0; // or return null if you prefer
  // }
  return parseInt(raw,10);
};

 const processData = () => {
  const now = new Date();
  const filteredData = [];
  const mediaTypeCounts = {};
  const engagementByType = {};
  const locationCounts = {};
  const violentCounts = {};
  const hashtagCounts = {};
  const wordCounts = {};
  const timeSeriesMap = {};
  const totalObjectsMap = {};

  const timeLimit = new Date(now); // clone
  if (timeRange === 'week') {
    timeLimit.setDate(now.getDate() - 7);
  } else if (timeRange === 'month') {
    timeLimit.setMonth(now.getMonth() - 1);
  }

  data.forEach(post => {
const postDate = new Date(post.dateTime_of_post.$date)

    if (timeRange === 'week' || timeRange === 'month') {
      if (postDate <= timeLimit) return; // Skip
    }

    filteredData.push(post); // save filtered post

    // Media type count
    const mediaType = post.media_type;
    mediaTypeCounts[mediaType] = (mediaTypeCounts[mediaType] || 0) + 1;

    // Engagement by media type
    const likes = cleanLikesCount(post.likes_count) 
    const comments = parseInt(post.comments_count) ;
    if (!engagementByType[mediaType]) {
      engagementByType[mediaType] = { likes: 0, comments: 0 };
    }
    engagementByType[mediaType].likes += likes;
    engagementByType[mediaType].comments += comments;

    // Location count
    const location = post.place;
    if (location) {
      locationCounts[location] = (locationCounts[location]||0 ) + 1;
    }

    // Violent label count
    if (post.label && post.label !== "null") {
      violentCounts[post.label] = (violentCounts[post.label] || 0) + 1;
    }

    // Hashtag counts
    if (post.caption) {
      const hashtags = post.caption.match(/#\w+/g) || [];
      hashtags.forEach(tag => {
        const lowerTag = tag.toLowerCase();
        hashtagCounts[lowerTag] = (hashtagCounts[lowerTag] || 0) + 1;
      });
    }

    // Word counts
    const keyword = post.keyword;
    if (keyword) {
      wordCounts[keyword] = (wordCounts[keyword] || 0) + 1;
    }

    // Time series and total objects
    const dateStr = postDate.toLocaleDateString();

    if (!timeSeriesMap[dateStr]) {
      timeSeriesMap[dateStr] = { date: dateStr, likes: 0, comments: 0 };
    }
    timeSeriesMap[dateStr].likes += likes;
    timeSeriesMap[dateStr].comments += comments;

    if (!totalObjectsMap[dateStr]) {
      totalObjectsMap[dateStr] = { date: dateStr, likes: 0, comments: 0, count: 0 };
    }
    totalObjectsMap[dateStr].likes += likes;
    totalObjectsMap[dateStr].comments += comments;
    totalObjectsMap[dateStr].count += 1;
  });

  // Sort and slice
  const topHashtags = Object.entries(hashtagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const topWords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const topLocation = Object.entries(locationCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const topViolent = Object.entries(violentCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Combined counts
  const combinedCounts = { ...hashtagCounts };
  for (const [word, count] of Object.entries(wordCounts)) {
    combinedCounts[word] = (combinedCounts[word] || 0) + count;
  }

  const topCombined = Object.entries(combinedCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const timeSeries = Object.values(timeSeriesMap).sort((a, b) => new Date(a.date) - new Date(b.date));
  const totalobjects = Object.values(totalObjectsMap).sort((a, b) => new Date(a.date) - new Date(b.date));

  setProcessedData({
    mediaTypeCounts,
    engagementByType,
    topHashtags,
    timeSeries,
    topWords,
    topLocation,
    topViolent,
    topCombined,
    totalobjects
  });
};

  if (!processedData) return (<CircularProgress/>);
console.log(processedData)
  // Chart data configurations
  const mediaTypeChartData = {
    labels: Object.keys(processedData.mediaTypeCounts),
    datasets: [{
      data: Object.values(processedData.mediaTypeCounts),
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    }]
  };

  const engagementChartData = {
    labels: Object.keys(processedData.engagementByType),
    datasets: [
      {
        label: 'Likes',
        data: Object.values(processedData.engagementByType).map(x => x.likes),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Comments',
        data: Object.values(processedData.engagementByType).map(x => x.comments),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      }
      ,
//       {
//   label: 'Total Posts',
//   data: Object.values(processedData.engagementByType).map(x => x.count),
//   backgroundColor: 'rgba(255, 206, 86, 0.6)', // Yellow-ish
//   borderColor: 'rgba(255, 206, 86, 1)',
//   borderWidth: 1,
// }

    ]
  };

  const hashtagChartData = {
    labels: processedData.topCombined.map(item => item[0]),
    datasets: [{
      label: 'Hashtag Usage',
      data: processedData.topCombined.map(item => item[1]),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }]
  };
  // const WordChartData = {
  //   labels: processedData.topWords.map(item => item[0]),
  //   datasets: [{
  //     label: 'Keyword Usage',
  //     data:processedData.topWords.map(item => item[1]),
  //     backgroundColor: 'rgba(54, 162, 235, 0.6)',
  //     borderColor: 'rgba(54, 162, 235, 1)',
  //     borderWidth: 1,
  //   }]
  // };
  const LocationChartData = {
    labels: processedData.topLocation.map(item => item[0]),
    datasets: [{
      label: 'Location Usage',
      data:processedData.topLocation.map(item => item[1]),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }]
  };

  const ViolentChartData = {
    labels: processedData.topViolent.map(item => item[0]),
    datasets: [{
      label: 'violent Usage',
      data:processedData.topViolent.map(item => item[1]),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }]
  };

  const timeSeriesChartData = {
    labels: processedData.timeSeries.map(item => item.date),
    datasets: [
      {
        label: 'Likes',
        data: processedData.timeSeries.map(item => item.likes),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        tension: 0.1,
        fill: true
      },
      {
        label: 'Comments',
        data: processedData.timeSeries.map(item => item.comments),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        tension: 0.1,
        fill: true
      }
    ]
  };

    const totalObjectsChartData = {
    labels: processedData.totalobjects.map(item => item.date),
    datasets: [
      
      {
        label: 'Total Posts',
  data: Object.values(processedData.totalobjects).map(x => x.count),
  backgroundColor: 'rgba(255, 206, 86, 0.6)', // Yellow-ish
  borderColor: 'rgba(255, 206, 86, 1)',
  borderWidth: 1,
        tension: 0.1,
        fill: true
      }
    ]
  };
  const wordCloudOptions = {
    colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
    enableTooltip: true,
    deterministic: false,
    fontFamily: 'Arial',
    fontSizes: [12, 60],
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: 'sqrt',
    spiral: 'archimedean',
    transitionDuration: 1000,
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
         Post Analytics
      </Typography>
      
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
      <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Platform</InputLabel>
          <Select
            value={platform}
            label="Platform"
            onChange={(e) => setPlatform(e.target.value)}
          >
            <MenuItem value="instagram">Instagram</MenuItem>
            <MenuItem value="facebook">Facebook</MenuItem>
            <MenuItem value="twitter">Twitter</MenuItem>
            <MenuItem value="snapchat">Snapchat</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="week">Last 7 Days</MenuItem>
            <MenuItem value="month">Last 30 Days</MenuItem>
            <MenuItem value="all">All Time</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {/* Media Type Distribution */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Post Type Distribution
            </Typography>
            <Box sx={{ height: '300px' }}>
              <Pie 
                data={mediaTypeChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                  }
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Engagement by Post Type */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Engagement by Post Type
            </Typography>
            <Box sx={{ height: '300px' }}>
              <Bar 
                data={engagementChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Top Hashtags */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Top Hashtags in  caption
            </Typography>
            <Box sx={{ height: '300px' }}>
              <Bar 
                data={hashtagChartData}
                options={{
                  indexAxis: 'y',
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </Box>
          </Paper>
        </Grid>
{/* 
        // <Grid item xs={12} md={6}>
        //   <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
        //     <Typography variant="h6" gutterBottom>
        //       Top Keywords
        //     </Typography>
        //     <Box sx={{ height: '300px' }}>
        //       <Bar 
        //         data={WordChartData}
        //         options={{
        //           indexAxis: 'y',
        //           responsive: true,
        //           maintainAspectRatio: false,
        //           scales: {
        //             x: {
        //               beginAtZero: true
        //             }
        //           }
        //         }}
        //       />
        //     </Box>
        //   </Paper>
        // </Grid> */}


        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Top Location Searches
            </Typography>
            <Box sx={{ height: '300px' }}>
              <Bar 
                data={LocationChartData}
                options={{
                  indexAxis: 'y',
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </Box>
          </Paper>
        </Grid>



        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              violent Searches
            </Typography>
            <Box sx={{ height: '300px' }}>
              <Bar 
                data={ViolentChartData}
                options={{
                  indexAxis: 'y',
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Engagement Over Time */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Engagement Over Time
            </Typography>
            <Box sx={{ height: '300px' }}>
              <Line 
                data={timeSeriesChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Total posts per day
            </Typography>
            <Box sx={{ height: '300px' }}>
              <Line 
                data={totalObjectsChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InstagramAnalytics;