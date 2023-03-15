class Listener {
    constructor(playlistsService, mailSender) {
      this._playlistsService = playlistsService;
      this._mailSender = mailSender;
  
      this.listen = this.listen.bind(this);
    }
  
    async listen(message) {
      try {
        const { credentialId, playlistId, targetEmail } = JSON.parse(message.content.toString());
  
        const songs = await this._playlistsService.getPlaylistSongs(credentialId, playlistId);
        const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(songs));
      } catch (error) {
        console.error(error);
      }
    }
  }
  
  module.exports = Listener;
  