import { useEffect, useRef } from "react"
import Chart from "react-apexcharts"
import type { ChartType } from "@/types/adminTypes"

type OrderChartProps = ChartType & {
  type: "bar" | "pie" | "line"
  id: string
  label: string
}

const ChartComponent = (props: OrderChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ro = new ResizeObserver(() => {
      window.dispatchEvent(new Event("resize"))
    })

    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const options: ApexCharts.ApexOptions = {
    chart: {
      id: props.id,
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: props.data_for_selected_year.map(d => d.month),
    },
  }

  const series: ApexAxisChartSeries = [
    {
      name: props.label,
      data: props.data_for_selected_year.map(d => d.count),
    },
  ]

  return (
    <div ref={containerRef} className="w-full min-w-0 overflow-hidden">
      <Chart
        options={options}
        series={series}
        type={props.type}
        width="100%"
      />
    </div>
  )
}

export default ChartComponent
