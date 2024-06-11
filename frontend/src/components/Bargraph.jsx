import { BarChart, Bar,XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer ,Legend} from 'recharts';

// const data = [
//   { rating: 500, solved: 5 },
//   { rating: 1000, solved: 3 },
//   {rating:1400,solved:3},
//   { rating: 1500, solved: 4 },
//   { rating: 2000, solved: 6 },
// ];
export default function Bargraph({data}) {
  return (
    <ResponsiveContainer width="70%" height={500} >
    <BarChart data={data} margin={{ top:20 ,right:0}} barGap={-2}>
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis dataKey="rating" label={{ value: 'Problem Rating', position: 'insideBottomRight', offset: -1 }} />
      <YAxis  allowDecimals={false}  label={{ value: 'Problems Solved', angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Legend />
      <Bar dataKey="solved" fill="#FF3366"  barSize={40}/>
    </BarChart>
  </ResponsiveContainer>
  );
}
