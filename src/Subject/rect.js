import { lineBuilder } from "../Builder"
import { event } from "d3-selection"

export default ({ subjectData, type }) => {
  if (!subjectData.width) {
    subjectData.width = 100
  }
  if (!subjectData.height) {
    subjectData.height = 100
  }

  const scale = type.transform ? type.transform[0] : 1

  let handles = []
  let { width, height } = subjectData

  const data = [[0, 0], [width * scale, 0], [width * scale, height * scale], [0, height * scale], [0, 0]]
  let rect = lineBuilder({ data, className: "subject", transform: type.transform })

  if (type.editMode) {
    const updateWidth = () => {
      subjectData.width = subjectData.width + event.dx
      type.redrawSubject()
      type.redrawConnector()
    }

    const updateHeight = () => {
      subjectData.height = subjectData.height + event.dy
      type.redrawSubject()
      type.redrawConnector()
    }

    const rHandles = [
      { x: width * scale, y: height / 2 * scale, drag: updateWidth.bind(type) },
      { x: width / 2 * scale, y: height * scale, drag: updateHeight.bind(type) }
    ]

    handles = type.mapHandles(rHandles)
  }

  if (subjectData.filled) {
    rect.attrs["fill-opacity"] = 0.1;
    rect.attrs.fill = type.annotation._color;
  } else {
    rect.attrs["fill-opacity"] = 0;
  }

  return { components: [rect], handles }
}
