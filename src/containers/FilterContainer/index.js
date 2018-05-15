import React from 'react';
import { Grid, Col } from 'react-bootstrap';
import Sidebar from '../Sidebar';
import FilterDropdown from '../../components/FilterDropdown';
import OptionGroup from '../../components/OptionGroup'

import { YEAR_SELECTED } from '../../helpers/constants'

import './style.css'

const defaultYearCount = 5
const defaultStateCount = 1
const defaultSerie = 'farm'
const defaultSerie_element = 0
const dataSourceCounts = 8

const fontSizeArray = [
  { label: 'A', type: 'a1', size: '1em'},
  { label: 'A', type: 'a2', size: '1.5em'},
  { label: 'A', type: 'a2', size: '2em'},
]

export default class FilterContainer extends React.Component {
  state = {
    selectedStateNames: [],
    whichOneMultiple: YEAR_SELECTED,     
    blockIndex: 0,
    yearsInfo: [],
    statesInfo: [],
    selectedYears: [],
    temp_Years: [],
    temp_States: [],
    selectedStates: [],
    filters: [],
    pre_filters:[],
    runQuery: '',
    priority: [],
    isRemoveDataSource: false,
    isAllDataSources: false,
    isGetSurveyData: false,
    isReset: false,
    fontSizeIndex: 0
  }
  
  

}