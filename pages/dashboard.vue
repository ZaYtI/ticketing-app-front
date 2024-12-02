<template>
    <CardContainer class="mb-3">

        <h1>Graphiques avec Highcharts</h1>
    <div class="flex justify-around grid grid-cols-2 gap-6">
  
      <ChartDynamicChart
        :type="'pie'"
        :title="'Répartition des ventes'"
        :series="[
          {
            name: 'Produits',
            colorByPoint: true,
            data: [
              { name: 'Produit A', y: 40 },
              { name: 'Produit B', y: 30 },
              { name: 'Produit C', y: 30 },
            ],
          },
        ]"
      />

      <ChartDynamicChart
      :type="'line'"
      :title="`Tickets créés sur l'année courante`"
      :categories="[
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
        'Oct', 'Nov', 'Dec'
      ]"
      :title_y-axis="'Tickets créés'"
      :series="[
        {
          name: 'Reggane',
          data: [
            16.0, 18.2, 23.1, 27.9, 32.2, 36.4, 39.8, 38.4, 35.5, 29.2,
            22.0, 17.8
          ],
        },
      ]"
    />
      
      </div>
    </CardContainer>

    <DashboardTable/>
</template>
