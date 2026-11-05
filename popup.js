document.getElementById('scriptToggle').addEventListener('change', async (event) => {
  const isEnabled = event.target.checked;

  try {
    // Get the current active tab in Firefox
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    const tab = tabs[0];

    if (!tab) return;

    // Execute script and pass the toggle state (true/false) as an argument
    await browser.scripting.executeScript({
      target: { tabId: tab.id },
      func: runToggleScript,
      args: [isEnabled]
    });
  } catch (error) {
    console.error("Failed to execute script:", error);
  }
});

// This function executes inside the active webpage context
function runToggleScript(turnOn) {
  if (turnOn) {
    // Code to run when switch is turned ON
    $('video').defaultPlaybackRate = 6;
  } else {
    // Code to run when switch is turned OFF
    console.log("Switch is OFF: Reverting changes.");
    $('video').defaultPlaybackRate = 1;
  }
}