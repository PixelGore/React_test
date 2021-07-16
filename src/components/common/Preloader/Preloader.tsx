//Imports
import React from 'react';
import preLoader from '../../../assets/common/preLoader.svg'
import './Preloader.scss'


//Preloader Component
let PreLoader: React.FC = () => {
    return (<div className="preLoader"><img src={preLoader} alt='preloader' /></div>)
}


//Export
export default PreLoader;