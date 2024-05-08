import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { BarChart } from '@mui/x-charts/BarChart';
import { useGetMonthInfoQuery } from '../../redux/Api/AdminApi';
import { ExpensesForm } from './ExpensesForm';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Button } from 'antd';

export const Dashboard = () => {
  const [chartData, setChartData] = useState({names: ["MON 1", "Mon 2"], values: [1, 2], expenses: [1, 2]});
  const [orderChart, setOrderChart] = useState({names: ["MON 1", "Mon 2"], values: [1, 2]});
  const [expensesChart, setExpensesChart] = useState([]);
  const [orderData, setOrderData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useGetMonthInfoQuery();
  const statistic = data ? data.data : '';
  const income = statistic.totalAmountSum;

  console.log("Expenses: ", expensesChart);


  const reload = () => {
    setIsLoading(true);
    axios.get('http://localhost:5001/api/admin/saleChart').then((data) => {
      setIsError(false);
      setIsLoading(false);
      setChartData(data.data.data);
    }).catch((Error) => {
      setIsError(true);
      setIsLoading(false);
    });
  }

  const reloadOrder = () => {
    setIsLoading(true);
    axios.get('http://localhost:5001/api/admin/orderChart').then((data) => {
      setIsError(false);
      setIsLoading(false);
      setOrderChart(data.data.data);
    }).catch((Error) => {
      setIsError(true);
      setIsLoading(false);
    });
  }

  const reloadExpences = () => {
    setIsLoading(true);
    axios.get('http://localhost:5001/api/admin/brandChart').then((data) => {
      console.log(data);
      setIsError(false);
      setIsLoading(false);
      setExpensesChart(data.data);
    }).catch((Error) => {
      setIsError(true);
      setIsLoading(false);
    });
  }


  useEffect(() => {
    reload();
  }, []);

  useEffect(() => {
    reloadOrder();
  }, []);

  useEffect(() => {
    reloadExpences();
  }, []);


  return (
    <div className='dashboard flex-column'>
        <div className="dashboard-header">
            <h2>DASHBOARD</h2>
        </div>
        <div className="statistics-header">
            <h3>STATISTICS</h3>
        </div>
        <div className="stat-container flex-row">
            <div className="stat flex-column">
                <h3>Orders Count</h3>
                <span className='orders-count'>{statistic.orderCount}</span>
                <span className='month'>{statistic.currentMonth}, {statistic.currentYear}</span>
            </div>
            <div className="stat flex-column">
                <h3>Month Income</h3>
                <span className='orders-count'>{income ? income.toFixed(2): 0}</span>
                <span className='month'>{statistic.currentMonth}, {statistic.currentYear}</span>
            </div>
            <div className="stat flex-column">
                <h3>Products Sold</h3>
                <span className='orders-count'>{statistic.totalProductCount}</span>
                <span className='month'>{statistic.currentMonth}, {statistic.currentYear}</span>
            </div>
        </div>
        <div className="statistics-header">
            <h3>CHARTS</h3>

        </div>
        <span className='chart-header'>Incomes/Expenses</span>
        <div className="expenses-incomes flex-row">
            <div className="chart">
                <BarChart
                    xAxis={[{ scaleType: 'band', data: chartData.names }]}
                    series={[{ data: chartData.values }, { data: chartData.expenses }]}
                    width={800}
                    height={400}
                    colorSet={['#6B292A', '#716D69']}
                />
            </div>
            <ExpensesForm></ExpensesForm>

        </div>

        <div className="orders-charts flex-row">
          <div className="order-chart-container">
            <LineChart
              width={800}
              height={350}
              series={[{ data: orderChart.values , label: 'Month Order Count', area: true, showMark:  true }]}
              xAxis={[{ scaleType: 'point', data: orderChart.names }]}
              sx={{
                [`& .${lineElementClasses.root}`]: {
                  display: 'none',
                },
              }}
            />
          </div>
          <div className="brand-chart">
            <PieChart
              series={[
                {
                  data: expensesChart.length !== 0?  expensesChart.data :[
                    { id: 0, value: 10, label: 'series A' },
                    { id: 1, value: 15, label: 'series B' },
                    { id: 2, value: 20, label: 'series C' },
                  ],
                },
              ]}
              width={500}
              height={400}
              style={{
                labels: { distance: -20 } 
            }}
            />

          </div>
        </div>

    </div>
  )
}
