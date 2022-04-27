import { ARROW_SIZE } from 'const/const';

export function drawArrow(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  x0: number, // 시작점 x
  y0: number, // 시작점 y
  x1: number, // 끝점 x
  y1: number, // 끝점 y
  size: 'xs' | 's' | 'm' | 'l' | 'xl',
  secondary = true
) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const angle = Math.atan2(dy, dx);
  const length = Math.sqrt(dx * dx + dy * dy);
  const arrowGap = 60;
  const borderArrowAddGap = 2;

  const { aLength, lineWidth } = ARROW_SIZE[size];
  // aWidth: number, // 화살촉이 선에서 수직으로 연장되는 거리
  // aLength: number, // 화살 날개의 길이
  // lineWidth: number, // 선의 전체 굵기

  if (ctx) {
    // border arrow
    ctx.lineWidth = lineWidth + 4;
    ctx.translate(x0, y0);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';

    const backgroundLine = new Path2D();
    backgroundLine.arc(
      length / 2 - lineWidth / 4,
      (length / 2) * Math.sqrt(3) - arrowGap,
      length,
      (Math.PI / 180) * (240 - 0.1),
      (Math.PI / 180) * (300 - 0.1),
      false
    );
    ctx.stroke(backgroundLine);

    ctx.beginPath();
    ctx.moveTo(length, lineWidth / 2 - arrowGap + borderArrowAddGap);
    ctx.lineTo(length - aLength - borderArrowAddGap, lineWidth / 2 - arrowGap + borderArrowAddGap);
    ctx.lineTo(length, lineWidth / 2 - aLength - arrowGap - borderArrowAddGap);
    ctx.lineTo(length + borderArrowAddGap, lineWidth / 2 - arrowGap);
    ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // color arrow
    ctx.lineWidth = lineWidth;
    ctx.translate(x0, y0);
    ctx.rotate(angle);

    // Line
    // ctx.clearRect(0, 0, 1300, 600);
    ctx.strokeStyle = secondary ? 'red' : 'blue';
    ctx.fillStyle = secondary ? 'red' : 'blue';

    const arrowLine = new Path2D();
    arrowLine.arc(
      length / 2 - lineWidth / 4,
      (length / 2) * Math.sqrt(3) - arrowGap,
      length,
      (Math.PI / 180) * 240,
      (Math.PI / 180) * 300,
      false
    );
    ctx.stroke(arrowLine);

    // Arrow Header
    ctx.beginPath();
    ctx.moveTo(length, lineWidth / 2 - arrowGap);
    ctx.lineTo(length - aLength, lineWidth / 2 - arrowGap);
    ctx.lineTo(length, lineWidth / 2 - aLength - arrowGap);
    ctx.lineTo(length, lineWidth / 2 - arrowGap);
    ctx.fill();
    // ctx.stroke();

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
