import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

export default function WordHistogram(props){
    const naive_bayes = props.naive_bayes
    const words = props.words; 

    const data = words.map(word => {
        const freqs = naive_bayes.get_word_count(word)

        return {
            word : word,
            positive : freqs[1],
            negative : freqs[0]
        }
    })

    return (
       
        <BarChart
        width={600}
        height={350}
        data={data}
        margin={{
            top: 5, right: 30, left: 20, bottom: 5,
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="word" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="positive" fill="#8884d8" />
        <Bar dataKey="negative" fill="#82ca9d" />
        </BarChart>
    );
}