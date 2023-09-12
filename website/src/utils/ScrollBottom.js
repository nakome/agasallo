export default function ScrollToBottom() {
  let w = setTimeout(() => {
    let appContent = document.querySelector(".drawer-body");
    let height = appContent.scrollHeight + 200;
    console.log(height)
    appContent.scrollTo(0, height);
    clearTimeout(w);
  }, 100);
}
