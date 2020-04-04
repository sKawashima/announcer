import app from './initBolt'
;(async () => {
  await app.start(process.env.PORT || 3000)
  console.log('⚡️ Bolt app is running')
})()

app.event('channel_created', async ({ event, context }) => {
  console.log('launch')
  try {
    const getChannelsListResponce: any = await app.client.channels.list({
      token: context.botToken
    })

    const channelListJoiningBot = await getChannelsListResponce.channels.filter(
      channel => {
        for (const member of channel.members) {
          if (member === context.botUserId) return true
        }
        return false
      }
    )

    await channelListJoiningBot.forEach(channel => {
      const postMessageResponce = app.client.chat.postMessage({
        token: context.botToken,
        channel: channel.name,
        text: `新しいチャンネルのお知らせ\n#${event.channel.name}`,
        link_names: true
      })
    })
  } catch (err) {
    console.log(err)
  }
})
