<script setup>
import { onMounted } from 'vue'
import data from '~/assets/vaccines.json'
import * as d3 from 'd3'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
const container = ref(null)

onMounted(() => {
  const names = [
    'Alaska',
    'Ala.',
    'Ark.',
    'Ariz.',
    'Calif.',
    'Colo.',
    'Conn.',
    'D.C.',
    'Del.',
    'Fla.',
    'Ga.',
    'Hawaii',
    'Iowa',
    'Idaho',
    'Ill.',
    'Ind.',
    'Kan.',
    'Ky.',
    'La.',
    'Mass.',
    'Md.',
    'Maine',
    'Mich.',
    'Minn.',
    'Mo.',
    'Miss.',
    'Mont.',
    'N.C.',
    'N.D.',
    'Neb.',
    'N.H.',
    'N.J.',
    'N.M',
    'Nev.',
    'N.Y.',
    'Ohio',
    'Okla.',
    'Ore.',
    'Pa.',
    'R.I.',
    'S.C.',
    'S.D.',
    'Tenn.',
    'Texas',
    'Utah',
    'Va.',
    'Vt.',
    'Wash.',
    'Wis.',
    'W.Va.',
    'Wyo.',
  ]

  const margin = { top: 20, right: 1, bottom: 40, left: 40 }
  const height = 16
  const innerHeight = height * names.length

  const values = []
  const year0 = d3.min(data[0].data.values.data, (d) => d[0])
  const year1 = d3.max(data[0].data.values.data, (d) => d[0])
  const years = d3.range(year0, year1 + 1)
  for (const [year, i, value] of data[0].data.values.data) {
    if (value == null) continue
    ;(values[i] || (values[i] = []))[year - year0] = value
  }
  const year = data[0].data.chart_options.vaccine_year

  const x = d3
    .scaleLinear()
    .domain([d3.min(years), d3.max(years) + 1])
    .rangeRound([margin.left, width.value - margin.right])

  const y = d3
    .scaleBand()
    .domain(names)
    .rangeRound([margin.top, margin.top + innerHeight])

  const color = d3.scaleSequentialSqrt(
    [0, d3.max(values, (d) => d3.max(d))],
    d3.interpolatePuRd
  )

  const xAxis = (g) =>
    g
      .call((g) =>
        g
          .append('g')
          .attr('transform', `translate(0,${margin.top})`)
          .call(d3.axisTop(x).ticks(null, 'd'))
          .call((g) => g.select('.domain').remove())
      )
      .call((g) =>
        g
          .append('g')
          .attr('transform', `translate(0,${innerHeight + margin.top + 4})`)
          .call(
            d3
              .axisBottom(x)
              .tickValues([year])
              .tickFormat((x) => x)
              .tickSize(-innerHeight - 10)
          )
          .call((g) =>
            g
              .select('.tick text')
              .clone()
              .attr('dy', '2em')
              .style('font-weight', 'bold')
              .text('Measles vaccine introduced')
          )
          .call((g) => g.select('.domain').remove())
      )

  const yAxis = (g) =>
    g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickSize(0))
      .call((g) => g.select('.domain').remove())

  const f = d3.format(',d')
  const format = (d) =>
    isNaN(d)
      ? 'N/A cases'
      : d === 0
      ? '0 cases'
      : d < 1
      ? '<1 case'
      : d < 1.5
      ? '1 case'
      : `${f(d)} cases`

  const svg = d3
    .create('svg')
    .attr('viewBox', [
      0,
      0,
      width.value,
      innerHeight + margin.top + margin.bottom,
    ])
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)

  svg.append('g').call(xAxis)

  svg.append('g').call(yAxis)

  svg
    .append('g')
    .selectAll('g')
    .data(values)
    .join('g')
    .attr('transform', (d, i) => `translate(0,${y(names[i])})`)
    .selectAll('rect')
    .data((d) => d)
    .join('rect')
    .attr('x', (d, i) => x(years[i]) + 1)
    .attr('width', (d, i) => x(years[i] + 1) - x(years[i]) - 1)
    .attr('height', y.bandwidth() - 1)
    .attr('fill', (d) => (isNaN(d) ? '#eee' : d === 0 ? '#fff' : color(d)))
    .append('title')
    .text((d, i) => `${format(d)} per 100,000 people in ${years[i]}`)

  console.log(svg.node(), container, 'sssssss')
  container.value.append(svg.node())
})
</script>

<template>
  <div ref="container"></div>
  <!-- <div class="grid grid-cols-1 place-items-center pb-10"></div> -->
</template>

<style scoped></style>
