import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import DisplayLoading from "./../../components/DisplayLoading";

const ChartOrderDay = () => {
	Chart.register(...registerables);
	const [chartData, setChartData] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTotalOrders = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/orders/total-by-period`,
					{
						params: {
							period: "day",
						},
					}
				);
				const totalOrders = response.data.orders_period;
				// Extract labels and data from the response
				const orderPeriodDay = totalOrders.map((order) => order.day);
				const orderTotal = totalOrders.map((order) => order.total);

				// Set the chart data
				setChartData({
					labels: orderPeriodDay,
					datasets: [
						{
							label: `Total Orders (${"day"})`,
							data: orderTotal,
							fill: false,
							backgroundColor: "rgba(75, 192, 192, 0.2)",
							borderColor: "rgb(75, 192, 192)",
							tension: 0.1,
						},
					],
				});
			} catch (error) {
				console.error("Error fetching total orders:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchTotalOrders();
	}, []);

	if (loading) {
		return <DisplayLoading />;
	}

	return (
		<div className="chart-container" style={{ width: "45%", height: "300px" }}>
			<h2>Total Orders (day) this month</h2>
			<Line data={chartData} />
		</div>
	);
};

const ChartOrderMonth = () => {
	Chart.register(...registerables);
	const [chartData, setChartData] = useState({});
	const [loading, setLoading] = useState(true);

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	useEffect(() => {
		const fetchTotalOrders = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/orders/total-by-period`,
					{
						params: {
							period: "month",
						},
					}
				);
				const totalOrders = response.data.orders_period;

				const orderTotalsByMonth = months.reduce((acc, month, index) => {
					acc[index + 1] = { month, total: 0 };
					return acc;
				}, {});

				totalOrders.forEach((order) => {
					orderTotalsByMonth[order.month].total = order.total;
				});

				// Extract labels and data from the orderTotalsByMonth object
				const labels = months;
				const data = Object.values(orderTotalsByMonth).map(
					(order) => order.total
				);

				// Set the chart data
				setChartData({
					labels: labels,
					datasets: [
						{
							label: `Total Orders (month)`,
							data: data,
							fill: false,
							backgroundColor: "rgba(75, 192, 192, 0.2)",
							borderColor: "rgb(75, 192, 192)",
							tension: 0.1,
						},
					],
				});
			} catch (error) {
				console.error("Error fetching total orders:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchTotalOrders();
	}, []);

	if (loading) {
		return <DisplayLoading />;
	}

	return (
		<div className="chart-container" style={{ width: "45%", height: "300px" }}>
			<h2>Total Orders (month)</h2>
			<Bar data={chartData} />
		</div>
	);
};

const ChartOrderYear = () => {
	Chart.register(...registerables);
	const [chartData, setChartData] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTotalOrders = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/orders/total-by-period`,
					{
						params: {
							period: "year",
						},
					}
				);
				const totalOrders = response.data.orders_period;
				// Extract labels and data from the response
				const orderPeriodDay = totalOrders.map((order) => order.period);
				const orderTotal = totalOrders.map((order) => order.total);

				// Set the chart data
				setChartData({
					labels: orderPeriodDay,
					datasets: [
						{
							label: `Total Orders (${"year"})`,
							data: orderTotal,
							fill: false,
							backgroundColor: "rgba(75, 192, 192, 0.2)",
							borderColor: "rgb(75, 192, 192)",
							tension: 0.1,
						},
					],
				});
			} catch (error) {
				console.error("Error fetching total orders:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchTotalOrders();
	}, []);

	if (loading) {
		return <DisplayLoading />;
	}

	return (
		<div className="chart-container" style={{ width: "100%", height: "300px" }}>
			<h2>Total Orders (year)</h2>
			<Bar data={chartData} />
		</div>
	);
};

export { ChartOrderDay, ChartOrderMonth, ChartOrderYear };
