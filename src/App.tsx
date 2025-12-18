import { SentimentStackList } from "./SentimentStackList"
import { ChartAreaLegend } from "./ChartAreaLegend"
import { ChartBarLabel } from "./ChartBarLabel"
import { ChartPieDonutWithText } from "./ChartPieDonutWithText"
import { ChartBarVerticalStacked } from "./ChartBarVerticalStacked"

function App() {
  return (
    <>
      <ChartAreaLegend />
      <ChartPieDonutWithText />
      <ChartBarLabel />
      <SentimentStackList />
      <ChartBarVerticalStacked />
    </>
  )
}

export default App
