
// components/RadialChart.tsx
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";


interface RadialChartProps {
  name?: string;
  value?: number;
  fill?: string;
}

export default function RadialChart({name,value, fill} : RadialChartProps) {
    const datajson = [{
        nama : name,
        value : value,
        fill : fill
    }];
  return (
    <div className="flex items-center justify-center relative w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="100%"
          barSize={15}
          data={datajson}
          startAngle={90}
          endAngle={450}
          clockwise // Move the clockwise prop here
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar background={false} dataKey="value" cornerRadius={15} />
        </RadialBarChart>
      </ResponsiveContainer>

      {/* Persentase di tengah */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-blue-500">
          {datajson[0].value}%
        </span>
        <span className="text-gray-500 text-sm">{datajson[0].nama}</span>
      </div>
    </div>
  );
}
