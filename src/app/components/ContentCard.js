// import React, { useEffect } from 'react';
// import Image from 'next/image';
// import personIcon from '../Assets/profile.svg';
// import heartIcon from '../Assets/heart.png';
// import clockIcon from '../Assets/clock.png';
// import loginIcon from '../Assets/login.png';
// import locationn from '../Assets/location2.png';
// import commentsIcon from '../Assets/bookIcon.png';
// import './ContentCard.css';
// import { Tooltip } from '@mui/material';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import axios from "../lib/axios"
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import redirect from "../Assets/redirect.jpg"
// /**
//  * Props:
//  * - mediaType: 'video' | 'iframe' | 'image'
//  * - mediaSrc: string
//  * - username: string
//  * - likes: number
//  * - timestamp: string
//  * - description: string
//  * - comments: Array<{ user: string; text: string }>;
//  * - onLoginClick?: () => void
//  */




// export default function ContentCard({
//     mediaType,
//     mediaSrc,
//     username,
//     likes,
//     watchlist,
//     timestamp,
//     userProfileLink,
//     location,
//     watchlistUpdate,
//     selectedPlatform,
//     selectedOption,
//     description,
//     comments = [],
//     postlink,
// }) {
//     console.log(selectedPlatform)
//     const addWatchedUser=async(username,userid)=>{
//         try{
//             let word = ""

//             if (selectedPlatform == "INSTAGRAM") {
//             word = "Instagram"
//             }
//             else if (selectedPlatform == "TWITTER") {
//             word = "Twitter"
//             }
//             else if (selectedPlatform == "SNAPCHAT") {
//             word = "Snapchat"
//             }
//             else if (selectedPlatform == "FACEBOOK") {
//             word = "Fb"
//             }
//             else if (selectedPlatform == "WHATSAPP") {
//             word = "whatsapp"
//             }
//             else if (selectedPlatform == "TELEGRAM") {
//             word = "telegram"
//             }
//             const response=await axios.post(`/addWatchedUser${word}`,{username:username,userid:userid})
            
//             if(response.status==200){
//                 alert("user added to watchlist")
//             }
            
//         }
//         catch(error){
//             if (error.response && error.response.status === 403) {
//                 alert(error.response.data.data);
//             }
//             // console.log(e)
//         }
//     }

//     const removeWatchedUser=async(username,userid)=>{
//         try{
//             let word = ""

//             if (selectedPlatform == "INSTAGRAM") {
//             word = "insta"
//             }
//             else if (selectedPlatform == "TWITTER") {
//             word = "twitter"
//             }
//             else if (selectedPlatform == "SNAPCHAT") {
//             word = "snapchat"
//             }
//             else if (selectedPlatform == "FACEBOOK") {
//             word = "fb"
//             }
//             else if (selectedPlatform == "WHATSAPP") {
//             word = "whatsapp"
//             }
//             else if (selectedPlatform == "TELEGRAM") {
//             word = "telegram"
//             }
//             const response=await axios.post(`/watchlistRemove`,{username:username,userid:userid,collectionList:`${word}_watchlist`,collectionData:`${word}_watchlist_data`})
            
//             if(response.status==200){
//                 alert("user removed to watchlist")
//             }
            
//         }
//         catch(error){
//             if (error.response && error.response.status === 403) {
//                 alert(error.response.data.data);
//             }
//             // console.log(e)
//         }
//     }
      
//     return (
//         <div className="large-background-box">
//             <div className="video-section-wrapper">
//                 {selectedPlatform!=="TELEGRAM" && (
//   <>
//     {mediaType === 'vid' && (
//       <video
//         className="media-player"
//         src={mediaSrc}
//         autoPlay
//         muted
//         loop
//         controls
//         style={{ maxWidth: '100%', borderRadius: '12px' }}
//       >
//         <source src={mediaSrc} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     )}

//     {mediaType === 'iframe' && (
//       <iframe
//         className="media-player"
//         src={mediaSrc}
//         frameBorder="0"
//         allowFullScreen
//       />
//     )}

//     {mediaType === 'img' && (
//       <div className="media-player">
//         <img
//           className="photos"
//           src={mediaSrc}
//           alt="media"
//           style={{ maxWidth: '100%', borderRadius: '12px' }}
//         />
//       </div>
//     )}

//     {(!mediaType || !['vid', 'iframe', 'img'].includes(mediaType)) && (
//       <div
//         className="media-player"
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           color: '#aaa',
//           border: '1px dashed #555',
//           borderRadius: '12px',
//           padding: '1rem',
//           height: '200px',
//         }}
//       >
//         No image/video
//       </div>
//     )}
//   </>
// )}

// {selectedPlatform=="TELEGRAM" && mediaType=="text" && (
//   <>
//     {mediaType === 'vid' && (
//       <video
//         className="media-player"
//         src={mediaSrc}
//         autoPlay
//         muted
//         loop
//         controls
//         style={{ maxWidth: '100%', borderRadius: '12px' }}
//       >
//         <source src={mediaSrc} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     )}

//     {mediaType === 'iframe' && (
//       <iframe
//         className="media-player"
//         src={mediaSrc}
//         frameBorder="0"
//         allowFullScreen
//       />
//     )}

//     {mediaType === 'img' && (
//       <div className="media-player">
//         <img
//           className="photos"
//           src={mediaSrc}
//           alt="media"
//           style={{ maxWidth: '100%', borderRadius: '12px' }}
//         />
//       </div>
//     )}

//     {(!mediaType || !['vid', 'iframe', 'img'].includes(mediaType)) && (
//       <div
//         className="media-player"
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           color: '#aaa',
//           border: '1px dashed #555',
//           borderRadius: '12px',
//           padding: '1rem',
//           height: '200px',
//         }}
//       >
//         No image/video
//       </div>
//     )}
//   </>
// )}
// {selectedPlatform==="TELEGRAM"&&(mediaType!=="text")&&(
//     <div className="media-player">
//         <img
//           className="photos"
//           onClick={() => window.open(postlink, '_blank', 'noopener,noreferrer')}

//           src={redirect.src}
//           alt="media"
//           style={{ maxWidth: '100%', borderRadius: '12px',cursor:"pointer" }}
//         />
//       </div>
// )}

//                 <div className="right-section">
//                     <div className="village-info-box">
//                         <div className="info-group">
//                             <Image src={personIcon} alt="person" className="icon person" />
//                             <p className="username">{username}</p>
//                             {/* <Tooltip title="Add User" arrow> */}
//                             { selectedOption=="socialmedia" && !watchlist.some(user=>user.username===username) &&
//                             <PersonAddIcon sx={{ color: '#90caf9', fontSize: 28, cursor: 'pointer' }} onClick={async()=>{await addWatchedUser(username,userProfileLink),await watchlistUpdate()}} />
//                             }
//                             { selectedOption=="watchlist" && watchlist.some(user=>user.username===username) &&
//                             <PersonRemoveIcon sx={{ color: '#90caf9', fontSize: 28, cursor: 'pointer' }} onClick={async()=>{await removeWatchedUser(username,userProfileLink),await watchlistUpdate()}} />
//                             }
//                             {/* </Tooltip> */}
//                         </div>
//                         <div className="info-group">
//                             <Image src={heartIcon} alt="heart" className="icon heart" />
//                             <p className="likes">{likes}</p>
//                         </div>
//                         <div className="info-group">
//                             <Image src={clockIcon} alt="clock" className="icon clock" />
//                             <p className="timestamp" style={{ marginLeft: '10px', }}>
//                                 {timestamp}
//                             </p>
//                         </div>

//                         <div className="info-group">
//                             <Image src={locationn} alt="clock" className="icon clock" />
//                             <p className="timestamp">{location}</p>
//                         </div>
//                         {postlink.includes("https://") &&
//                             <div className="info-group">
//                                 <a href={postlink} target="_blank" rel="noopener noreferrer">
//                                     <Image
//                                         src={loginIcon}
//                                         alt="login"
//                                         className="icon login"
//                                         style={{ marginTop: '5px', marginLeft: '10px' }}
//                                     />
//                                 </a>
//                             </div>}
                            
//                             {/^\d+$/.test(postlink.split('/').pop()) && !postlink.includes("t.me")&&
//                             <div className="info-group">
//                                 <a href={`https://x.com/premium/status/${postlink}`} target="_blank" rel="noopener noreferrer">
//                                     <Image
//                                         src={loginIcon}
//                                         alt="login"
//                                         className="icon login"
//                                         style={{ marginTop: '5px', marginLeft: '10px' }}
//                                     />
//                                 </a>
//                             </div>}
//                     </div>
//                       <div className="description-box">
//                         <p className="description-text">Type : {postlink.includes("https://")?"Post":"Story"}</p>
//                     </div>
//                     <div className="description-box">
//                         <p className="description-text">{description}</p>
//                     </div>

//                     <div className="comments-header">
//                         <Image
//                             src={commentsIcon}
//                             alt="comment"
//                             className="icon comment"
//                         />
//                         <p className="comment-title">Comments</p>
//                     </div>

//                     <div className="comments-box">
//                         {comments.map((c, idx) => (
//                             <div key={idx} className="comment">
//                                 <p className="comment-text">
//                                     <a
//                                         href={c.profile_link}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         style={{ color: 'white', textDecoration: 'underline', fontWeight: 500, fontSize: 20 }}
//                                     >
//                                         {c.user}
//                                     </a>: {c.comment_text}
//                                 </p></div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
import React, { useEffect } from 'react';
import Image from 'next/image';
import personIcon from '../Assets/profile.svg';
import heartIcon from '../Assets/heart.png';
import clockIcon from '../Assets/clock.png';
import loginIcon from '../Assets/login.png';
import locationn from '../Assets/location2.png';
import commentsIcon from '../Assets/bookIcon.png';
import './ContentCard.css';
import { Tooltip } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from "../lib/axios"
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import redirect from "../Assets/redirect.jpg"
/**
 * Props:
 * - mediaType: 'video' | 'iframe' | 'image'
 * - mediaSrc: string
 * - username: string
 * - likes: number
 * - timestamp: string
 * - description: string
 * - comments: Array<{ user: string; text: string }>;
 * - onLoginClick?: () => void
 */




export default function ContentCard({
    mediaType,
    mediaSrc,
    username,
    likes,
    watchlist,
    timestamp,
    userProfileLink,
    location,
    watchlistUpdate,
    selectedPlatform,
    selectedOption,
    description,
    comments = [],
    postlink,
}) {
    console.log(selectedPlatform)
    const addWatchedUser=async(username,userid)=>{
        try{
            let word = ""

            if (selectedPlatform == "INSTAGRAM") {
            word = "Instagram"
            }
            else if (selectedPlatform == "TWITTER") {
            word = "Twitter"
            }
            else if (selectedPlatform == "SNAPCHAT") {
            word = "Snapchat"
            }
            else if (selectedPlatform == "FACEBOOK") {
            word = "Fb"
            }
            else if (selectedPlatform == "WHATSAPP") {
            word = "whatsapp"
            }
            else if (selectedPlatform == "TELEGRAM") {
            word = "telegram"
            }
            else if (selectedPlatform == "YOUTUBE") {
            word = "Youtube"
            }
            const response=await axios.post(`/addWatchedUser${word}`,{username:username,userid:userid})
            
            if(response.status==200){
                alert("user added to watchlist")
            }
            
        }
        catch(error){
            if (error.response && error.response.status === 403) {
                alert(error.response.data.data);
            }
            // console.log(e)
        }
    }

    const removeWatchedUser=async(username,userid)=>{
        try{
            let word = ""

            if (selectedPlatform == "INSTAGRAM") {
            word = "insta"
            }
            else if (selectedPlatform == "TWITTER") {
            word = "twitter"
            }
            else if (selectedPlatform == "SNAPCHAT") {
            word = "snapchat"
            }
            else if (selectedPlatform == "FACEBOOK") {
            word = "fb"
            }
            else if (selectedPlatform == "WHATSAPP") {
            word = "whatsapp"
            }
            else if (selectedPlatform == "TELEGRAM") {
            word = "telegram"
            }
            else if (selectedPlatform == "YOUTUBE") {
            word = "youtube"
            }
            const response=await axios.post(`/watchlistRemove`,{username:username,userid:userid,collectionList:`${word}_watchlist`,collectionData:`${word}_watchlist_data`})
            
            if(response.status==200){
                alert("user removed to watchlist")
            }
            
        }
        catch(error){
            if (error.response && error.response.status === 403) {
                alert(error.response.data.data);
            }
            // console.log(e)
        }
    }
      
    return (
        <div className="large-background-box">
            <div className="video-section-wrapper">
                {selectedPlatform!=="TELEGRAM" && (
  <>
    {mediaType === 'vid' && (
      <video
        className="media-player"
        src={mediaSrc}
        autoPlay
        muted
        loop
        controls
        style={{ maxWidth: '100%', borderRadius: '12px' }}
      >
        Your browser does not support the video tag.
      </video>
    )}

    {mediaType === 'iframe' && (
      <iframe
        className="media-player"
        src={mediaSrc}
        frameBorder="0"
        allowFullScreen
      />
    )}

    {mediaType === 'img' && (
      <div className="media-player">
        <img
          className="photos"
          src={mediaSrc}
          alt="media"
          style={{ maxWidth: '100%', borderRadius: '12px' }}
        />
      </div>
    )}

    {(!mediaType || !['vid', 'iframe', 'img'].includes(mediaType)) && (
      <div
        className="media-player"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#aaa',
          border: '1px dashed #555',
          borderRadius: '12px',
          padding: '1rem',
          height: '200px',
        }}
      >
        No image/video
      </div>
    )}
  </>
)}

{selectedPlatform=="TELEGRAM" && mediaType=="text" && (
  <>
    {mediaType === 'vid' && (
      <video
        className="media-player"
        src={mediaSrc}
        autoPlay
        muted
        loop
        controls
        style={{ maxWidth: '100%', borderRadius: '12px' }}
      >
        <source src={mediaSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )}

    {mediaType === 'iframe' && (
      <iframe
        className="media-player"
        src={mediaSrc}
        frameBorder="0"
        allowFullScreen
      />
    )}

    {mediaType === 'img' && (
      <div className="media-player">
        <img
          className="photos"
          src={mediaSrc}
          alt="media"
          style={{ maxWidth: '100%', borderRadius: '12px' }}
        />
      </div>
    )}

    {(!mediaType || !['vid', 'iframe', 'img'].includes(mediaType)) && (
      <div
        className="media-player"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#aaa',
          border: '1px dashed #555',
          borderRadius: '12px',
          padding: '1rem',
          height: '200px',
        }}
      >
        No image/video
      </div>
    )}
  </>
)}
{selectedPlatform==="TELEGRAM"&&(mediaType!=="text")&&(
    <div className="media-player">
        <img
          className="photos"
          onClick={() => window.open(postlink, '_blank', 'noopener,noreferrer')}

          src={redirect.src}
          alt="media"
          style={{ maxWidth: '100%', borderRadius: '12px',cursor:"pointer" }}
        />
      </div>
)}

                <div className="right-section">
                    <div className="village-info-box">
                        <div className="info-group">
                            <Image src={personIcon} alt="person" className="icon person" />
                            <p className="username">{username}</p>
                            {/* <Tooltip title="Add User" arrow> */}
                            { selectedOption=="socialmedia" && !watchlist.some(user=>user.username===username) && selectedPlatform=="INSTAGRAM" &&
                            <PersonAddIcon sx={{ color: '#90caf9', fontSize: 28, cursor: 'pointer' }} onClick={async()=>{await addWatchedUser(username,userProfileLink),await watchlistUpdate()}} />
                            }
                            { selectedOption=="watchlist" && watchlist.some(user=>user.username===username)&& selectedPlatform=="INSTAGRAM" &&
                            <PersonRemoveIcon sx={{ color: '#90caf9', fontSize: 28, cursor: 'pointer' }} onClick={async()=>{await removeWatchedUser(username,userProfileLink),await watchlistUpdate()}} />
                            }
                            {/* </Tooltip> */}
                        </div>
                        <div className="info-group">
                            <Image src={heartIcon} alt="heart" className="icon heart" />
                            <p className="likes">{likes}</p>
                        </div>
                        <div className="info-group">
                            <Image src={clockIcon} alt="clock" className="icon clock" />
                            <p className="timestamp" style={{ marginLeft: '10px', }}>
                                {timestamp}
                            </p>
                        </div>

                        <div className="info-group">
                            <Image src={locationn} alt="clock" className="icon clock" />
                            <p className="timestamp">{location}</p>
                        </div>
                        {postlink?.includes("https://") &&
                            <div className="info-group">
                                <a href={postlink} target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src={loginIcon}
                                        alt="login"
                                        className="icon login"
                                        style={{ marginTop: '5px', marginLeft: '10px' }}
                                    />
                                </a>
                            </div>}
                            
                            {postlink && /^\d+$/.test(postlink.split('/').pop()) && !postlink.includes("t.me")&&
                            <div className="info-group">
                                <a href={`https://x.com/premium/status/${postlink}`} target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src={loginIcon}
                                        alt="login"
                                        className="icon login"
                                        style={{ marginTop: '5px', marginLeft: '10px' }}
                                    />
                                </a>
                            </div>}
                    </div>
                      <div className="description-box">
                        <p className="description-text">Type : {postlink?.includes("https://") ?"Post": selectedPlatform=="TWITTER"?"Post":"Story"}</p>
                    </div>
                    <div className="description-box">
                        <p className="description-text">{description}</p>
                    </div>

                    <div className="comments-header">
                        <Image
                            src={commentsIcon}
                            alt="comment"
                            className="icon comment"
                        />
                        <p className="comment-title">Comments</p>
                    </div>

                    <div className="comments-box">
                        {comments.map((c, idx) => (
                            <div key={idx} className="comment">
                                <p className="comment-text">
                                    <a
                                        href={c.profile_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: 'white', textDecoration: 'underline', fontWeight: 500, fontSize: 20 }}
                                    >
                                        {c.user}
                                    </a>: {c.comment_text}
                                </p></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
