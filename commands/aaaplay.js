const { zokou } = require("../framework/zokou");
const axios = require("axios");
const ytSearch = require("yt-search");

zokou(
  {
    nomCom: "play",
    aliases: ["song", "audio", "mp3"],
    categorie: "Search",
    reaction: "🎵",
  },
  async (dest, zk, commandOptions) => {
    const { arg, ms, repondre } = commandOptions;

    if (!arg[0]) {
      return repondre("Please provide a song name.");
    }

    const query = arg.join(" ");

    try {
      // 🎶 Search for the song on YouTube
      const searchResults = await ytSearch(query);
      if (!searchResults.videos.length) {
        return repondre("No video found for the specified query.");
      }

      const firstVideo = searchResults.videos[0];
      const videoUrl = firstVideo.url;
      const videoTitle = firstVideo.title;
      const videoDuration = firstVideo.timestamp;
      const videoViews = firstVideo.views;
      const videoThumbnail = firstVideo.thumbnail;

      // 📌 Send fast response with full thumbnail
      await zk.sendMessage(dest, {
        text: "BWM XMD DOWNLOADER" +  
              " Title: " + videoTitle +  
              " Duration: " + videoDuration +  
              " Views: " + videoViews,  
        contextInfo: {
          externalAdReply: {
            title: videoTitle,
            body: "BWM XMD Downloader",
            mediaType: 1,
            thumbnailUrl: videoThumbnail,
            sourceUrl: videoUrl,
            renderLargerThumbnail: true,
            showAdAttribution: true,
          },
        },
      });

      // 🎧 Fetch audio from API
      const api = "https://api.bwmxmd.online/api/download/ytmp3?apikey=ibraah-help&url=" + encodeURIComponent(videoUrl);
      const response = await axios.get(api);
      const downloadData = response.data;

      if (!downloadData || !downloadData.success || !downloadData.result.download_url) {
        return repondre("Failed to retrieve a download link. Please try again later.");
      }

      const downloadUrl = downloadData.result.download_url;

      // 🎵 Send the audio file without extra context info
      await zk.sendMessage(dest, {
        audio: { url: downloadUrl },
        mimetype: "audio/mp4",
      });
    } catch (error) {
      console.error("Error during download process:", error.message);
      return repondre("Download failed: " + (error.message || error));
    }
  }
);


zokou(
  {
    nomCom: "song",
    aliases: ["song", "audio", "mp3"],
    categorie: "Search",
    reaction: "🎵",
  },
  async (dest, zk, commandOptions) => {
    const { arg, ms, repondre } = commandOptions;

    if (!arg[0]) {
      return repondre("Please provide a song name.");
    }

    const query = arg.join(" ");

    try {
      // 🎶 Search for the song on YouTube
      const searchResults = await ytSearch(query);
      if (!searchResults.videos.length) {
        return repondre("No video found for the specified query.");
      }

      const firstVideo = searchResults.videos[0];
      const videoUrl = firstVideo.url;
      const videoTitle = firstVideo.title;
      const videoDuration = firstVideo.timestamp;
      const videoViews = firstVideo.views;
      const videoThumbnail = firstVideo.thumbnail;

      // 📌 Send fast response with full thumbnail
      await zk.sendMessage(dest, {
        text: "BWM XMD DOWNLOADER" +  
              " Title: " + videoTitle +  
              " Duration: " + videoDuration +  
              " Views: " + videoViews,  
        contextInfo: {
          externalAdReply: {
            title: videoTitle,
            body: "BWM XMD Downloader",
            mediaType: 1,
            thumbnailUrl: videoThumbnail,
            sourceUrl: videoUrl,
            renderLargerThumbnail: true,
            showAdAttribution: true,
          },
        },
      });

      // 🎧 Fetch audio from API
      const api = "https://api.bwmxmd.online/api/download/ytmp3?apikey=ibraah-help&url=" + encodeURIComponent(videoUrl);
      const response = await axios.get(api);
      const downloadData = response.data;

      if (!downloadData || !downloadData.success || !downloadData.result.download_url) {
        return repondre("Failed to retrieve a download link. Please try again later.");
      }

      const downloadUrl = downloadData.result.download_url;

      // 🎵 Send the audio file without extra context info
      await zk.sendMessage(dest, {
        audio: { url: downloadUrl },
        mimetype: "audio/mp4",
      });
    } catch (error) {
      console.error("Error during download process:", error.message);
      return repondre("Download failed: " + (error.message || error));
    }
  }
);


zokou(
  {
    nomCom: "video",
    aliases: ["mp4", "vid"],
    categorie: "Search",
    reaction: "🎬",
  },
  async (dest, zk, commandOptions) => {
    const { arg, ms, repondre } = commandOptions;

    if (!arg[0]) {
      return repondre("Please provide a video name.");
    }

    const query = arg.join(" ");

    try {
      // 🎥 Search for the video on YouTube
      const searchResults = await ytSearch(query);
      if (!searchResults.videos.length) {
        return repondre("No video found for the specified query.");
      }

      const firstVideo = searchResults.videos[0];
      const videoUrl = firstVideo.url;
      const videoTitle = firstVideo.title;
      const videoDuration = firstVideo.timestamp;
      const videoViews = firstVideo.views;
      const videoThumbnail = firstVideo.thumbnail;

      // 📌 Send fast response with full thumbnail
      await zk.sendMessage(dest, {
        text: "BWM XMD DOWNLOADER" +  
              " Title: " + videoTitle +  
              " Duration: " + videoDuration +  
              " Views: " + videoViews,  
        contextInfo: {
          externalAdReply: {
            title: videoTitle,
            body: "BWM XMD Video Downloader",
            mediaType: 1,
            thumbnailUrl: videoThumbnail,
            sourceUrl: videoUrl,
            renderLargerThumbnail: true,
            showAdAttribution: true,
          },
        },
      });

      // 🎬 Fetch video from API
      const api = "https://api.bwmxmd.online/api/download/ytmp4?apikey=ibraah-help&url=" + encodeURIComponent(videoUrl);
      const response = await axios.get(api);
      const downloadData = response.data;

      if (!downloadData || !downloadData.success || !downloadData.result.download_url) {
        return repondre("Failed to retrieve a download link. Please try again later.");
      }

      const downloadUrl = downloadData.result.download_url;

      // 📽️ Send the video file without extra context info
      await zk.sendMessage(dest, {
        video: { url: downloadUrl },
        mimetype: "video/mp4",
      });
    } catch (error) {
      console.error("Error during download process:", error.message);
      return repondre("Download failed: " + (error.message || error));
    }
  }
);
