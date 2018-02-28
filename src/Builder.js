import { line, arc, curveLinear } from "d3-shape"

export const lineBuilder = ({ data, curve=curveLinear, canvasContext, className, classID }) => {
  const lineGen = line()
    .curve(curve)

  const builder = {
    type: 'path',
    className,
    classID,
    data
  }

  if (canvasContext) {
    lineGen.context(canvasContext)
    builder.pathMethods = lineGen

  } else {
    builder.attrs = {
      d: lineGen(data)
    }
  }

  return builder
}

export const arcBuilder = ({ data, canvasContext, className, classID, transform }) => {

  const builder = {
    type: 'path',
    className,
    classID,
    data,
    transform
  }

  const scale = transform ? transform[0] : 1

  const arcShape = arc()
    .innerRadius(data.innerRadius * scale || 0)
    .outerRadius(data.outerRadius * scale || data.radius * scale || 2 * scale)
    .startAngle(data.startAngle || 0)
    .endAngle(data.endAngle || 2*Math.PI)

  if (canvasContext) {
    arcShape.context(canvasContext)
    builder.pathMethods = lineGen

  } else {

    builder.attrs = {
      d: arcShape()
    }
  }

  return builder
}
