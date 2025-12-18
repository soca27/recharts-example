import { SentimentStackList } from "./SentimentStackList"
import { ChartAreaLegend } from "./ChartAreaLegend"
import { ChartBarLabel } from "./ChartBarLabel"
import { ChartPieDonut } from "./ChartPieDonut"
import { ChartBarVerticalStacked } from "./ChartBarVerticalStacked"

function App() {
  return (
    <>
      <ChartAreaLegend />
      <ChartPieDonut />
      <ChartBarLabel />
      <SentimentStackList />
      <ChartBarVerticalStacked />
    </>
  )
}

export default App
