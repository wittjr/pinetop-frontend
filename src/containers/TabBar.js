import React from 'react';
import { connect } from 'react-redux';
import TabbedNavBar from '../components/TabbedNavBar';
import { setActiveCard } from '../actions/userAction';
import PotStillCard from './PotStillCard';
import UtilityCalculator from '../components/UtilityCalculator';
import Dashboard from '../containers/Dashboard';
import FractionalStill from '../components/FractionalStill';
import FractionalStillPercent from '../components/FractionalStillPercent';
import HistoryTab from '../components/HistoryTab';
import AdminTab from '../components/AdminTab';

const TabBar = ( props ) => {
    // let selectedTab;

    const setActiveTab = (tabIndex, selectedTab) => {
        let indexValue = parseInt(tabIndex.value, 10);  // includes radix parameter to make react quit complaining
        selectedTab = props.allowedTabs[indexValue];
        props.setActiveCard(selectedTab);
    }

    return (
        <div>
            <TabbedNavBar tabName={props.allowedTabs} testFunction={setActiveTab} />
            {/* {props.activeCard === 'Explanation' ? <ExplanationCard /> : ""} */}
            {props.activeCard === 'Pot Still' ? <PotStillCard /> : ""}
            {props.activeCard === 'Utility Calculators' ? <UtilityCalculator /> : ""}
            {props.activeCard === 'Dashboard' ? <Dashboard /> : ""}
            {props.activeCard === 'Fractional Still (percent)' ? <FractionalStillPercent /> : ""}
            {props.activeCard === 'Fractional Still (temp)' ? <FractionalStill /> : ""}
            {props.activeCard === 'History' ? <HistoryTab /> : ""}
            {props.activeCard === 'Admin' ? <AdminTab /> : ""}
            {/* {props.activeCard === 'Purchase History' ? <PurchaseHistory /> : ""} */}
        </div>
    )
}



const mapStateToProps = state => ({
    allowedTabs: state.userInfo.allowedTabs,
    activeCard: state.userInfo.activeCard
})

export default connect(mapStateToProps, { setActiveCard })(TabBar);
