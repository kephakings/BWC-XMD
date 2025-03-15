import moment from 'moment-timezone';
import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import fetch from 'node-fetch';
import config from '../../config.cjs';

const groupSettings = {}; // Group settings store

const OwnerCmd = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const ownerNumber = config.OWNER_NUMBER + '@s.whatsapp.net';
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const isGroup = m.isGroup;
  const groupMetadata = isGroup ? await Matrix.groupMetadata(m.from) : null;
  const groupAdmins = isGroup ? groupMetadata.participants.filter(p => p.admin).map(p => p.id) : [];
  const isAdmin = groupAdmins.includes(m.sender);
  const isOwner = m.sender === ownerNumber;
  const isBot = m.sender === botNumber;

  // ✅ Join Group (Only Owner & Bot)
  if (cmd === 'join') {
    if (!isOwner && !isBot) return m.reply('❌ *Only the owner or bot can use this command!*');
    if (!text) return m.reply('📌 *Usage:* `.join <group link>`');

    const match = text.match(/chat\.whatsapp\.com\/([\w\d]*)/);
    if (!match) return m.reply('❌ *Invalid group link!*');

    try {
      const response = await Matrix.groupAcceptInvite(match[1]);
      return m.reply(response ? '✅ *Successfully joined the group!*' : '❌ *Failed to join. Link may be invalid or expired.*');
    } catch (error) {
      console.error(error);
      return m.reply('❌ *Error: Group may be full or restricted.*');
    }
  }

  // ❌ Leave Group (Only Owner & Bot)
  if (cmd === 'left') {
    if (!isOwner && !isBot) return m.reply('❌ *Only the owner or bot can use this command!*');

    try {
      await m.reply("👋 *Leaving the group...*");
      await Matrix.groupLeave(m.from);
    } catch (error) {
      console.error(error);
      await m.reply("❌ *Failed to leave the group!*");
    }
  }

  // 🔥 Owner React Feature Toggle
  if (cmd === 'ownerreact') {
    if (!isOwner && !isBot) return m.reply('*Only the owner or bot can use this command.*');

    if (text === 'on') {
      config.OWNER_REACT = true;
      await Matrix.sendMessage(m.from, { text: '✅ *OwnerReact enabled.*' }, { quoted: m });
    } else if (text === 'off') {
      config.OWNER_REACT = false;
      await Matrix.sendMessage(m.from, { text: '❌ *OwnerReact disabled.*' }, { quoted: m });
    } else {
      await Matrix.sendMessage(m.from, { text: '📌 *Usage:* `.ownerreact on/off`' }, { quoted: m });
    }
  }

  // 🔥 Owner Reaction (If enabled)
  if (config.OWNER_REACT && (m.sender === ownerNumber || m.sender === botNumber)) {
    try {
      const reactions = ['👑', '🤴🏻', '〽️', '🇵🇰'];
      const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
      await Matrix.sendMessage(m.from, { react: { text: randomReaction, key: m.key } });
    } catch (error) {
      console.error('Error reacting to owner message:', error);
    }
  }

  // ❤️ Heart React Feature Toggle
  if (cmd === 'heartreact') {
    if (!isOwner) return m.reply('*Only the owner can use this command.*');

    if (text === 'on') {
      config.HEART_REACT = true;
      await Matrix.sendMessage(m.from, { text: '✅ *HeartReact enabled.*' }, { quoted: m });
    } else if (text === 'off') {
      config.HEART_REACT = false;
      await Matrix.sendMessage(m.from, { text: '❌ *HeartReact disabled.*' }, { quoted: m });
    } else {
      await Matrix.sendMessage(m.from, { text: '📌 *Usage:* `.heartreact on/off`' }, { quoted: m });
    }
  }

  // ❤️ Heart Reaction (If enabled)
  if (config.HEART_REACT && (m.sender !== ownerNumber && m.sender !== botNumber)) {
    try {
      const heartReactions = ['🩷', '❤️', '🧡', '💛', '💚', '🩵', '💙', '💜', '🖤', '🤍', '🤎', '❤‍🔥', '💕', '💖', '💘'];
      const randomHeart = heartReactions[Math.floor(Math.random() * heartReactions.length)];
      await Matrix.sendMessage(m.from, { react: { text: randomHeart, key: m.key } });
    } catch (error) {
      console.error('Error reacting to message:', error);
    }
  }

  // 🚫 Block User (Only Owner & Bot)
  if (cmd === 'block') {
    if (!isOwner && !isBot) return m.reply('❌ *Only the owner or bot can use this command!*');

    let target;
    if (m.quoted) {
      target = m.quoted.sender;
    } else if (text) {
      target = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    } else {
      return m.reply("⚠️ *Please mention a user or provide a number!*");
    }

    try {
      await Matrix.updateBlockStatus(target, 'block');
      await m.reply(`🚫 *User blocked successfully!*`);
    } catch (error) {
      console.error(error);
      await m.reply("❌ *Failed to block the user!*");
    }
  }

  // ✅ Unblock User (Only Owner & Bot)
  if (cmd === 'unblock') {
    if (!isOwner && !isBot) return m.reply('❌ *Only the owner or bot can use this command!*');

    let target;
    if (m.quoted) {
      target = m.quoted.sender;
    } else if (text) {
      target = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    } else {
      return m.reply("⚠️ *Please mention a user or provide a number!*");
    }

    try {
      await Matrix.updateBlockStatus(target, 'unblock');
      await m.reply(`✅ *User unblocked successfully!*`);
    } catch (error) {
      console.error(error);
      await m.reply("❌ *Failed to unblock the user!*");
    }
  }
};

// POWERED BY BANDAHEALI
export default OwnerCmd;
