import {NameSpace} from '../root-reducer';

export const getActiveCity = (state) => state[NameSpace.CHANGE].activeCity;
