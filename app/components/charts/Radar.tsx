import React from "react";

import { ResponsiveRadar } from "@nivo/radar";

export const RadarChart: React.FC<{data?: any}> = ({data}) => {
	return (
		<ResponsiveRadar
			data={data.radarChartData}
			keys={['current', 'wanted', 'golden']}
			indexBy="branch"
			valueFormat=">-.2f"
			margin={{top: 70, right: 80, bottom: 40, left: 80}}
			borderColor={{
				from: 'color',
				modifiers: [
					['darker', 0.6],
					['opacity', 0.5]
				]
			}}
			gridLevels={10}
			gridLabelOffset={36}
			dotSize={0}
			dotColor={{theme: 'background'}}
			dotBorderWidth={2}
			colors={{scheme: 'nivo'}}
			blendMode="multiply"
			motionConfig="wobbly"
			legends={[
				{
					anchor: 'top-left',
					direction: 'column',
					translateX: -50,
					translateY: -40,
					itemWidth: 80,
					itemHeight: 20,
					itemTextColor: '#999',
					symbolSize: 12,
					symbolShape: 'circle',
					effects: [
						{
							on: 'hover',
							style: {
								itemTextColor: '#000'
							}
						}
					]
				}
			]}
		/>
	);
};
