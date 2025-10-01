async function main() {
  // ⚠️ 把這裡換成你的 LIFF ID
  await liff.init({ liffId: 2008215037-9DDXW8rd });

  if (!liff.isLoggedIn()) {
    liff.login();
  }

  // 顯示使用者資訊
  document.getElementById("btnProfile").onclick = async () => {
    const profile = await liff.getProfile();
    document.getElementById("output").innerText =
      `Hello, ${profile.displayName}! 你的 userId 是：${profile.userId}`;
  };

  // 傳訊息給 BOT
  document.getElementById("btnSend").onclick = async () => {
    await liff.sendMessages([{
      type: 'text',
      text: '我從 LIFF 網頁傳訊息回來啦！ 🎉'
    }]);
    alert("已傳送訊息給 BOT！");
  };
}

main();