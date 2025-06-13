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
                    console.log(tempData.data.result)
                    setData(tempData.data.result)
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
        return parseInt(
            String(data.likes_count || "0").replace(/,/g, '').trim()
        )
    }
    const processData = () => {
        // Filter by time range
        const now = new Date();
        let filteredData = [...data];

        if (timeRange === 'week') {
            filteredData = data.filter(post => {
                const postDate = new Date(post.dateTime_of_post);
                return postDate > new Date(now.setDate(now.getDate() - 7));
            });
        } else if (timeRange === 'month') {
            filteredData = data.filter(post => {
                const postDate = new Date(post.dateTime_of_post);
                return postDate > new Date(now.setMonth(now.getMonth() - 1));
            });
        }

        // Process media types
        const mediaTypeCounts = filteredData.reduce((acc, post) => {
            acc[post.media_type] = (acc[post.media_type] || 0) + 1;
            return acc;
        }, {});


        // Process likes and comments by media type
        const engagementByType = filteredData.reduce((acc, post) => {
            if (!acc[post.media_type]) {
                acc[post.media_type] = { likes: 0, comments: 0 };
            }
            acc[post.media_type].likes += cleanLikesCount(post.likes_count) || 0;
            acc[post.media_type].comments += parseInt(post.comments_count) || 0;
            return acc;
        }, {});
        // const wordCounts = filteredData.reduce((acc, item) => {
        //   acc[item.keyword] = (acc[item.keyword] || 0) + 1; // If the item already exists, increment its count, otherwise set it to 1
        //   return acc;
        // }, {});


        // extract locations 
        const locationCounts = filteredData.reduce((acc, item) => {
            acc[item.place] = (acc[item.place] || 0) + 1; // If the item already exists, increment its count, otherwise set it to 1
            return acc;
        }, {});
        const topLocation = Object.entries(locationCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        const violentCounts = filteredData.reduce((acc, item) => {
            if (item.label && item.label !== "null" && item.label !== null) {
                acc[item.label] = (acc[item.label] || 0) + 1;
            }
            return acc;
        }, {});

        console.log(violentCounts)
        const topViolent = Object.entries(violentCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
        // Extract hashtags from captions
        const hashtags = filteredData.flatMap(post => {
            if (post.caption) {
                return post.caption.match(/#\w+/g) || [];
            }
            return [];
        });

        const hashtagCounts = hashtags.reduce((acc, hashtag) => {
            const lowerHashtag = hashtag.toLowerCase();
            acc[lowerHashtag] = (acc[lowerHashtag] || 0) + 1;
            return acc;
        }, {});

        const topHashtags = Object.entries(hashtagCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
        // Count hashtags
        // const hashtagCounts = hashtags.reduce((acc, hashtag) => {
        //   const lowerHashtag = hashtag.toLowerCase();
        //   acc[lowerHashtag] = (acc[lowerHashtag] || 0) + 1;
        //   return acc;
        // }, {});

        // Count keywords
        const wordCounts = filteredData.reduce((acc, item) => {
            acc[item.keyword] = (acc[item.keyword] || 0) + 1;
            return acc;
        }, {});
        const topWords = Object.entries(wordCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
        // Merge counts
        const combinedCounts = { ...hashtagCounts };

        for (const [word, count] of Object.entries(wordCounts)) {
            combinedCounts[word] = (combinedCounts[word] || 0) + count;
        }

        // Sort and get top 10 combined entries
        const topCombined = Object.entries(combinedCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        // console.log(topCombined);

        // Prepare time series data
        const timeSeries = Object.values(
            filteredData.reduce((acc, post) => {
                const date = new Date(post.dateTime_of_post).toLocaleDateString();
                const likes = cleanLikesCount(post.likes_count) || 0;
                const comments = parseInt(post.comments_count) || 0;

                if (!acc[date]) {
                    acc[date] = { date, likes: 0, comments: 0 };
                }

                acc[date].likes += likes;
                acc[date].comments += comments;

                return acc;
            }, {})
        ).sort((a, b) => new Date(a.date) - new Date(b.date));

        const totalobjects = Object.values(
            filteredData.reduce((acc, post) => {
                const date = new Date(post.dateTime_of_post).toLocaleDateString();
                const likes = cleanLikesCount(post.likes_count) || 0;
                const comments = parseInt(post.comments_count) || 0;

                if (!acc[date]) {
                    acc[date] = { date, likes: 0, comments: 0, count: 0 };
                }

                acc[date].likes += likes;
                acc[date].comments += comments;
                acc[date].count += 1; // Count of posts on this date

                return acc;
            }, {})
        ).sort((a, b) => new Date(a.date) - new Date(b.date));
        console.log(totalobjects)
        setProcessedData({
            mediaTypeCounts,
            engagementByType,
            topHashtags,
            timeSeries, topWords, topLocation, topViolent, topCombined, totalobjects
        });
    };

    if (!processedData) return (<CircularProgress />);

    // Chart data configurations
    const mediaTypeChartData = {
        labels: Object.keys(processedData.mediaTypeCounts),
        datasets: [{
            data: Object.values(processedData.mediaTypeCounts),
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
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
            {
                label: 'Total Posts',
                data: Object.values(processedData.engagementByType).map(x => x.count),
                backgroundColor: 'rgba(255, 206, 86, 0.6)', // Yellow-ish
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            }

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

            <Box
                sx={{
                    mb: 3,
                    display: 'flex',
                    gap: 2,
                    color: 'white',  // inherit white text
                    '& .MuiInputLabel-root': {
                        color: 'white', // label
                    },
                    '& .MuiSelect-icon': {
                        color: 'white', // dropdown arrow
                    },
                    '& .MuiSelect-select': {
                        color: 'white', // selected text
                    },
                    // target the outlined border
                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                }}
            >
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


            <Grid container spacing={3}>
                {/* Post Type Distribution */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 2,
                            height: 450,        // total card height
                            width: '100%',      // fill its column
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Post Type Distribution
                        </Typography>
                        <Box sx={{ flexGrow: 1, minHeight: 300 }}>
                            <Pie
                                data={mediaTypeChartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { position: 'right' } },
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Engagement by Post Type */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 2,
                            height: 450,
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Engagement by Post Type
                        </Typography>
                        <Box sx={{ flexGrow: 1, minHeight: 300 }}>
                            <Bar
                                data={engagementChartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: { y: { beginAtZero: true } }
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Top Hashtags */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 2,
                            height: 450,
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Top Hashtags in Caption
                        </Typography>
                        <Box sx={{ flexGrow: 1, minHeight: 300 }}>
                            <Bar
                                data={hashtagChartData}
                                options={{
                                    indexAxis: 'y',
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: { x: { beginAtZero: true } }
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Engagement Over Time */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 2,
                            height: 450,
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Engagement Over Time
                        </Typography>
                        <Box sx={{ flexGrow: 1, minHeight: 300 }}>
                            <Line
                                data={timeSeriesChartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: { y: { beginAtZero: true } }
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Total Posts Per Day */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 2,
                            height: 450,
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Total Posts Per Day
                        </Typography>
                        <Box sx={{ flexGrow: 1, minHeight: 300 }}>
                            <Line
                                data={totalObjectsChartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: { y: { beginAtZero: true } }
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