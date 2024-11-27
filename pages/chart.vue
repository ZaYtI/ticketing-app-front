<template>
  <CardContainer>
    <h1>Graphiques avec Highcharts</h1>
    <div class="flex justify-around">
      
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
        :type="'column'"
        :title="'Évolution des ventes'"
        :series="[
          {
            name: 'Mois',
            data: [10, 20, 30],
          },
        ]"
      />
    </div>
  </CardContainer>
</template>
