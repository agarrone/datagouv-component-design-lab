<script setup lang="ts">
import '../../shared/foundations.css'
import '../../shared/tables.css'
import {useTranslation} from '../../../vendor/datagouv-components/src/composables/useTranslation'
import {useFormatTabular,isTruthy} from '../../../vendor/datagouv-components/src/functions/tabular'
import type {ColumnType} from '../../../vendor/datagouv-components/src/components/TabularExplorer/types'
defineProps<{value:unknown;columnType:ColumnType;compact?:boolean;noNumberFormat?:boolean}>()
const {t}=useTranslation()
const {formatNumber,formatCellDate}=useFormatTabular()
</script>
<template>
 <span v-if="value == null || value === ''" class="lab-table-null" :aria-label="t('Valeur manquante')">null</span>
 <span v-else-if="columnType==='boolean'" class="lab-table-boolean" :data-value="isTruthy(value)">{{isTruthy(value)?t('Vrai'):t('Faux')}}</span>
 <span v-else-if="columnType==='number'||columnType==='year'" class="lab-table-value lab-table-number">{{columnType==='year'||noNumberFormat?value:formatNumber(value)}}</span>
 <span v-else-if="columnType==='date'" class="lab-table-value">{{formatCellDate(value)}}</span>
 <span v-else-if="columnType==='categorical'" class="lab-table-category">{{value}}</span>
 <span v-else class="lab-table-text">{{typeof value==='object'?JSON.stringify(value):value}}</span>
</template>
