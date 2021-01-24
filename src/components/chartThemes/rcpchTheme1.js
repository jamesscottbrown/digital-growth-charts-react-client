import {ChartTheme, ChartObject, GridlineObject, CentilesObject, MeasurementsObject, AxesObject} from './themes'

/* 
Theme 1

Data:  #7159aa - purple
Area:  #c6bddd - purple (tint 40%)
tooltip: #fdc300 - yellow

gridlines: #d9d9d9 - light grey
text: #000000 - black
background colour: #FFFFFF - white
centile width: 1.5 px

font: Montserrat regular

*/

const centileColour = "#7159aa"
const pubertyFill = "#c6bddd"
const tooltipBackGroundColour = "#fdc300"
const tooltipTextColour = "#000000"
const gridlineColour = "#d9d9d9"
const gridlineWidth = 0.25
const backgroundColour = "#FFFFFF"
const centileWidth = 1.5
const axisLabelColour = "#000000"
const axisstroke = "#000000"
const measurementsFill = "#000000"
const measurementsShape = 'circle'
const measurementsSize = 2
const axisLabelSize = 6
const tickLabelSize = 4
const axisLabelFont = "Montserrat"

const RCPCHChart = new ChartObject(
     backgroundColour,
     809,
     700,
     tooltipBackGroundColour,
     tooltipTextColour
)

const RCPCHGridlines = new GridlineObject(
    true,
    gridlineColour,
    gridlineWidth,
    false
)

const RCPCHCentiles = new CentilesObject(
    centileColour,
    centileWidth,
    pubertyFill
)

const RCPCHAxes = new AxesObject(
    axisstroke,
    axisLabelColour,
    axisLabelFont,
    axisLabelSize,
    tickLabelSize
)

const RCPCHMeasurements = new MeasurementsObject(
    measurementsFill,
    measurementsSize,
    measurementsShape
)

const RCPCHTheme1 = new ChartTheme(RCPCHChart, RCPCHGridlines, RCPCHAxes, RCPCHCentiles, RCPCHMeasurements)

export default RCPCHTheme1