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
  const [data, setData] = useState([])
  const [platform, setPlatform] = useState('instagram');
  useEffect(() => {
    async function instaData() {
      try {
        let tempData = null
        if (platform == "twitter") {
          tempData = await axios.post("/twitter_all_data")
        }
        else if (platform == "instagram") {
          tempData = await axios.post("/instagram_all_data")
        }
        else if (platform == "facebook") {
          tempData = await axios.post("/fb_all_data")
        }
        else if (platform == "snapchat") {
          tempData = await axios.post("/snapchat_all_data")
        }
        if (tempData.status == 200) {
          console.log(tempData)
          console.log(tempData.data.data)
          setData(tempData.data.data)
        }
      }
      catch (e) {
        console.log(e)
      }
    }
    instaData()
  }, [platform])
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
    return parseInt(raw, 10);
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
      console.log(post.dateTime_of_post_str)
      const postDateStr = post.dateTime_of_post_str?.split('T')[0] || post.dateTime_of_post_str?.split(' ')[0];
const postDate = new Date(postDateStr);


      if (timeRange === 'week' || timeRange === 'month') {
        if (postDate <= timeLimit) return; // Skip
      }

      filteredData.push(post); // save filtered post

      // Media type count
      const mediaType = post.media_type;
      mediaTypeCounts[mediaType] = (mediaTypeCounts[mediaType] || 0) + 1;

      // Engagement by media type
      const likes = cleanLikesCount(post.likes_count)
      const comments = parseInt(post.comments_count);
      if (!engagementByType[mediaType]) {
        engagementByType[mediaType] = { likes: 0, comments: 0 };
      }
      engagementByType[mediaType].likes += likes;
      engagementByType[mediaType].comments += comments;

      // Location count
      const location = post.place;
      if (location) {
        locationCounts[location] = (locationCounts[location] || 0) + 1;
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
      const dateStr = postDateStr
      console.log(postDateStr,"data")

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

  if (!processedData) return (<CircularProgress />);
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
      data: processedData.topLocation.map(item => item[1]),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }]
  };

  const ViolentChartData = {
    labels: processedData.topViolent.map(item => item[0]),
    datasets: [{
      label: 'violent Usage',
      data: processedData.topViolent.map(item => item[1]),
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

      {/* filters */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <FormControl
          size="small"
          sx={{
            minWidth: 120,
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
              '& svg': { color: 'white' }, // dropdown arrow
            },
          }}
        >
          <InputLabel>Platform</InputLabel>
          <Select
            value={platform}
            label="Platform"
            onChange={(e) => setPlatform(e.target.value)}
          >
            <MenuItem value="instagram">Instagram</MenuItem>
            {/* <MenuItem value="facebook">Facebook</MenuItem> */}
            <MenuItem value="youtube">YouTube</MenuItem>
            <MenuItem value="twitter">Twitter</MenuItem>
            <MenuItem value="snapchat">Snapchat</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          size="small"
          sx={{
            minWidth: 120,
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
              '& svg': { color: 'white' },
            },
          }}
        >
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

      {/* chart cards container */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 3,              // space between cards
        }}
      >
        {[
          {
            title: 'Post Type Distribution',
            content: (
              <Pie
                data={mediaTypeChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'right' } },
                }}
              />
            ),
          },
          {
            title: 'Engagement by Post Type',
            content: (
              <Bar
                data={engagementChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: { y: { beginAtZero: true } },
                }}
              />
            ),
          },
          {
            title: 'Top Hashtags in caption',
            content: (
              <Bar
                data={hashtagChartData}
                options={{
                  indexAxis: 'y',
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: { x: { beginAtZero: true } },
                }}
              />
            ),
          },
          {
            title: 'Top Location Searches',
            content: (
              <Bar
                data={LocationChartData}
                options={{
                  indexAxis: 'y',
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: { x: { beginAtZero: true } },
                }}
              />
            ),
          },
          {
            title: 'Violent Searches',
            content: (
              <Bar
                data={ViolentChartData}
                options={{
                  indexAxis: 'y',
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: { x: { beginAtZero: true } },
                }}
              />
            ),
          },
          {
            title: 'Engagement Over Time',
            content: (
              <Line
                data={timeSeriesChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: { y: { beginAtZero: true } },
                }}
              />
            ),
          },
          {
            title: 'Total Posts per Day',
            content: (
              <Line
                data={totalObjectsChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: { y: { beginAtZero: true } },
                }}
              />
            ),
          },
        ].map(({ title, content }) => (
          <Paper
            key={title}
            elevation={3}
            sx={{
              width: 1400,        // fixed width
              height: 400,        // fixed height
              p: 2,               // padding
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <Box
              sx={{
                flexGrow: 1,             // fill remaining space
                position: 'relative',    // for charts with maintainAspectRatio:false
              }}
            >
              {content}
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
export default InstagramAnalytics;






