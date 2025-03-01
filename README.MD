
# Discord DM Cleaner

This script is designed to clean your Discord DMs by deleting messages. It allows you to easily delete all DMs except for the ones from whitelisted users, and it also updates your custom status to indicate the cleaning process.

## Features
- Cleans your Discord DMs by deleting messages from all users.
- Skips DMs from whitelisted users (users whose IDs are specified in the configuration file).
- Updates your Discord status during the cleaning process.
- Uses a configuration file (`config.json`) to manage the bot token and whitelist.

## Requirements
- Node.js (version 14.x or higher)
- A Discord bot token (can be generated from the [Discord Developer Portal](https://discord.com/developers/applications))
- Access to the Discord API via the `fetch` method

## Installation

### 1. Clone the repository or download the project files:
```bash
git clone https://github.com/infallibless/discord-dm-cleaner.git
```

### 2. Install dependencies:
Make sure you have Node.js installed. If not, download it from the official website: https://nodejs.org/.

In your project folder, run the following to install required dependencies:

```bash
npm install kleur
```

### 3. Set up the `config.json` file:
Create a file named `config.json` in the project root directory and fill it with the following format:

```json
{
  "token": "your_discord_bot_token_here",
  "whitelist": [
    "user_id_1",
    "user_id_2"
  ]
}
```

- Replace `"your_discord_bot_token_here"` with your actual Discord bot token.
- Add the user IDs of the people whose DMs should **not** be deleted in the `"whitelist"` array.

To get the user ID of a Discord user, you can enable "Developer Mode" in Discord's settings and right-click the user to copy their ID.

### 4. Run the script:
Once everything is set up, you can run the script using the following command:

```bash
node del.js
```

This will start the process of deleting your DMs while respecting the whitelist. The script will also update your Discord status to indicate the cleaning process.

## How It Works
- The script fetches all your DMs using the Discord API.
- It checks the sender of each message. If the sender is in the whitelist, the message is skipped; otherwise, the message is deleted.
- During the cleaning process, the bot’s custom status is updated to indicate that the DMs are being cleaned.
- Once the cleaning process is complete, the bot's status is reset to normal.

## Example of `config.json`:

```json
{
  "token": "selftoken",
  "whitelist": [
    "userid1",
    "userid2"
  ]
}
```

## Notes
- **Security Warning**: Your Discord bot token is sensitive information. **Do not expose this token** publicly. Make sure to add `config.json` to your `.gitignore` file to avoid pushing it to public repositories.
- **Message Deletion Limit**: Discord allows up to 100 messages to be deleted in one request. This script fetches and deletes messages in batches of 50.
- **Bot Permissions**: Ensure that your bot has the appropriate permissions to read and delete messages in your DMs.

## Troubleshooting

- **Error: "403 Forbidden"**: This error typically occurs when the bot token is invalid or the bot doesn’t have the correct permissions.
- **Messages not being deleted**: Check if the whitelist is properly set and make sure that the bot has the correct permissions to delete messages in your DMs.

## License
This project is licensed under the MIT License.
