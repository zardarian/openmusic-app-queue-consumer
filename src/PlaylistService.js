const { Pool } = require('pg');
 
class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistSongs(credentialId, playlistId) {
    const playlist = await this.getPlaylist(playlistId, credentialId);
    const songs = await this.getSongs(playlistId);
    
    const result = { playlist: playlist }
    result.playlist.songs = songs

    return result
  }

  async getPlaylist(playlistId, credentialId) {
    const query = {
      text: `select p.id, p.name from playlists p
      where p.id = $1 and p.owner = $2`,
      values: [playlistId, credentialId]
    }

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getSongs(playlistId) {
    const query = {
        text: `select s.id, s.title, s.performer from playlist_songs ps
        left join songs s on s.id = ps.song_id
        where ps.playlist_id = $1`,
        values: [playlistId],
    };
    
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistService;
