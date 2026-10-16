<script setup>
import { ref, provide } from 'vue';
import { configKey } from '../vendor/datagouv-components/src/config';
import BrandedButton from '../vendor/datagouv-components/src/components/BrandedButton.vue';
import Tag from '../vendor/datagouv-components/src/components/Tag.vue';
import SimpleBanner from '../vendor/datagouv-components/src/components/SimpleBanner.vue';
import BannerAction from '../vendor/datagouv-components/src/components/BannerAction.vue';
import ProgressBar from '../vendor/datagouv-components/src/components/ProgressBar.vue';
import SegmentedControl from '../vendor/datagouv-components/src/components/SegmentedControl.vue';
import AnimatedLoader from '../vendor/datagouv-components/src/components/AnimatedLoader.vue';
import BouncingDots from '../vendor/datagouv-components/src/components/BouncingDots.vue';
import './demo.css';
defineProps({ name: String, compact: Boolean });
provide(configKey, { name: 'Design Lab', baseUrl: 'https://www.data.gouv.fr', apiBase: 'https://www.data.gouv.fr/api/1/' });
const active = ref('all');
const clicks = ref(0);
</script>

<template>
  <div class="demo-content" :class="{ 'demo-compact': compact }">
    <template v-if="name === 'BrandedButton'">
      <div class="demo-row"><BrandedButton @click="clicks++">{{ clicks ? `Cliqué ${clicks} fois` : 'Publier les données' }}</BrandedButton><BrandedButton color="secondary">Annuler</BrandedButton></div>
      <div v-if="!compact" class="demo-row"><BrandedButton color="tertiary">En savoir plus</BrandedButton><BrandedButton disabled>Indisponible</BrandedButton><BrandedButton loading>Chargement</BrandedButton></div>
      <div v-if="!compact" class="demo-row"><BrandedButton size="xs">Petit</BrandedButton><BrandedButton size="sm">Standard</BrandedButton><BrandedButton size="lg">Grand</BrandedButton><BrandedButton color="danger">Supprimer</BrandedButton></div>
    </template>
    <template v-else-if="name === 'Tag'"><div class="demo-row"><Tag type="secondary">Mobilité</Tag><Tag type="secondary">Données ouvertes</Tag><Tag type="secondary">Environnement</Tag></div></template>
    <template v-else-if="name === 'SimpleBanner'"><SimpleBanner type="primary">Une nouvelle version de ces données est disponible.</SimpleBanner><template v-if="!compact"><SimpleBanner type="success">Vos modifications ont été enregistrées.</SimpleBanner><SimpleBanner type="warning">Vérifiez les informations avant publication.</SimpleBanner><SimpleBanner type="danger">La publication a échoué.</SimpleBanner></template></template>
    <BannerAction v-else-if="name === 'BannerAction'" type="primary" title="Complétez la description des données">Une description précise facilite la réutilisation.<template #button><BrandedButton>Compléter</BrandedButton></template></BannerAction>
    <template v-else-if="name === 'ProgressBar'"><ProgressBar :value="0.65" bar-class="bg-new-primary" aria-label="Complétude : 65 %" /><template v-if="!compact"><ProgressBar :value="0.3" bar-class="bg-new-warning" aria-label="Complétude : 30 %" /><ProgressBar :value="1" bar-class="bg-new-success" aria-label="Complétude : 100 %" /></template></template>
    <SegmentedControl v-else-if="name === 'SegmentedControl'" v-model="active" :options="[{ value: 'all', label: 'Tout' }, { value: 'datasets', label: 'Données' }, { value: 'services', label: 'API' }]" />
    <AnimatedLoader v-else-if="name === 'AnimatedLoader'" style="width: 32px; height: 32px" />
    <BouncingDots v-else-if="name === 'BouncingDots'" />
  </div>
</template>

<style>
.demo-content { display: flex; flex-direction: column; justify-content: center; gap: 24px; width: 100%; font-family: Arial, sans-serif; }
.demo-row { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; }
.demo-compact { pointer-events: none; }
</style>
