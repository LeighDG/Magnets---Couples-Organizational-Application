// server/realtime/realtime.cjs

// userId -> Set(res)
const subscribers = new Map();

function addSubscriber(userId, res) {
  if (!subscribers.has(userId)) subscribers.set(userId, new Set());
  subscribers.get(userId).add(res);
}

function removeSubscriber(userId, res) {
  const set = subscribers.get(userId);
  if (!set) return;
  set.delete(res);
  if (set.size === 0) subscribers.delete(userId);
}

// This is the ONLY API your routes should use.
function notifyUser(userId, eventName, payload) {
  const set = subscribers.get(userId);
  if (!set) return;

  const data = `event: ${eventName}\ndata: ${JSON.stringify(payload)}\n\n`;
  for (const res of set) {
    res.write(data);
  }
}

module.exports = {
  addSubscriber,
  removeSubscriber,
  notifyUser,
};
