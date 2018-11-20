'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var RADIUS = 50;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_HEIGHT = 16;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var BAR_SPACE = 50;
var messageHeight = CLOUD_Y + 3 * FONT_HEIGHT + 4 * GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + RADIUS, y);
  ctx.lineTo(x + CLOUD_WIDTH - RADIUS, y);
  ctx.arcTo(x + CLOUD_WIDTH, y, x + CLOUD_WIDTH, y + RADIUS, RADIUS);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT - RADIUS);
  ctx.arcTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT, x + CLOUD_WIDTH - RADIUS, y + CLOUD_HEIGHT, RADIUS);
  ctx.lineTo(x + RADIUS, y + CLOUD_HEIGHT);
  ctx.arcTo(x, y + CLOUD_HEIGHT, x, y + CLOUD_HEIGHT - RADIUS, RADIUS);
  ctx.lineTo(x, y + RADIUS);
  ctx.arcTo(x, y, x + RADIUS, y, RADIUS);
  ctx.fill();
  ctx.closePath();
};

var winningMessage = function (ctx) {
  ctx.fillText('Ура вы победили!', CLOUD_X + 4 * GAP, CLOUD_Y + GAP + FONT_HEIGHT);
  ctx.fillText('Список результатов:', CLOUD_X + 4 * GAP, CLOUD_Y + 2 * (GAP + FONT_HEIGHT));
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var buildHistogram = function (ctx, names, times) {
  var maxTime = Math.round(getMaxElement(times));

  for (var i = 0; i < names.length; i++) {
    var eachHeight = BAR_MAX_HEIGHT * times[i] / maxTime;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillText(names[i], CLOUD_X + BAR_SPACE + (BAR_SPACE + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_SPACE + (BAR_SPACE + BAR_WIDTH) * i, messageHeight + BAR_MAX_HEIGHT - GAP - eachHeight);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + (Math.floor(Math.random() * 100)) + '%, 50%)';
    }
    ctx.fillRect(CLOUD_X + BAR_SPACE + (BAR_SPACE + BAR_WIDTH) * i, messageHeight + BAR_MAX_HEIGHT - eachHeight, BAR_WIDTH, eachHeight);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.textBaseLine = 'hanging';
  ctx.font = '16px "PT Mono"';
  winningMessage(ctx);
  buildHistogram(ctx, names, times);
};
