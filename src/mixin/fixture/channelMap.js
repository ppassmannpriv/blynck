const calc = (points, channels) => {
  const DMXbase = Math.floor(512 / channels) * channels;
  const totalChannels = points * channels;
  const universeCount = Math.ceil(totalChannels / DMXbase);
  let universes = {};
  for (let i = 0; i < universeCount; i++) {
    let channelCountForUniverse = DMXbase;
    if (totalChannels > DMXbase) {
      channelCountForUniverse = totalChannels - i * DMXbase;
      if (channelCountForUniverse > DMXbase) channelCountForUniverse = DMXbase;
    }
    universes[i] = fillUniverse(channelCountForUniverse);
  }

  return {
    points,
    channels,
    totalChannels,
    universeCount,
    universes,
  };
};

const fillUniverse = (channelCountInUniverse) => {
  const universe = {
    r: generateRange(1, channelCountInUniverse - 2, 3),
    g: generateRange(2, channelCountInUniverse - 1, 3),
    b: generateRange(3, channelCountInUniverse, 3),
  };
  return universe;
};

const generateRange = (min, max, step) => {
  let arr = [];
  for (let i = min; i <= max; i += step) {
    arr.push(i);
  }
  return arr;
};

export default { calc, generateRange };
