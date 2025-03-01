const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const token = config.token;
const whitelist = config.whitelist;
const headers = { 'Authorization': token, 'Content-Type': 'application/json' };
const color = require('kleur');

const setstatus = (status) => fetch('https://discord.com/api/v9/users/@me/settings', {
    method: 'PATCH', headers, body: JSON.stringify({ custom_status: {text: status} })
});

const deletemessage = async (channelid) => { let messages;
    do {
        messages = await (await fetch(`https://discord.com/api/v9/channels/${channelid}/messages?limit=50`, { headers })).json();
        for (const { id, content, author } of messages) {
            if (!whitelist.includes(author.id)) {
                await fetch(`https://discord.com/api/v9/channels/${channelid}/messages/${id}`, { method: 'DELETE', headers });
                console.log(color.yellow(`[OK] deleted -> ${content}`));
            } else {
                console.log(color.green(`[SKIP] whitelisted user -> ${content}`));
            }
        }
    } while (messages.length);
};

const deletealldms = async () => {
    try {
        console.log(color.yellow('[INFO] status added...')), console.log(setstatus);
        await setstatus('dm is clearing... || github.com/infallibless');
        for (const { id } of await (await fetch('https://discord.com/api/v9/users/@me/channels', {headers})).json()) {
            await deletemessage(id);
        }
    } catch (e4) {
        console.error(e4);
    } finally {
        await setstatus('');
    }
};

deletealldms().then(() => console.log(color.green('[OK] complete'))).catch(console.error);
