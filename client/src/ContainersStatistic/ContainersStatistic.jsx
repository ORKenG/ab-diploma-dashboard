import React, {useEffect, useState} from 'react'

const ContainersStatistic = ({ containerStatistics }) => {
    const getPercents = (val) => { return `${(val * 100).toFixed(1)} %` };
    const [elements, setElements] = useState([]);


    useEffect(() => {

    const mergedObjectsArr = [];

    containerStatistics && Object.keys(containerStatistics).
        forEach(key => {
            containerStatistics[key]
                .forEach(obj => {
                    const indexOfExisting = mergedObjectsArr.findIndex(item => item._id === obj._id);

                    if (indexOfExisting !== -1) {
                        Object.assign(mergedObjectsArr[indexOfExisting], obj);
                    } else {
                        mergedObjectsArr.push(obj)
                    }
                }
                )
        });

        setElements(mergedObjectsArr);
    }, [containerStatistics])


    let elementsTable = [];

    if (elements.length > 0) {
        elementsTable = elements.map((item, index) => {
            return (
                <div key={ item._id } className="row">
                    <div className="col-2">
                        <div className="text-center">
                            { item._id }
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                { item.Total }
                            </div>
                            <div className="col">
                                { item.totalUniqueUsers }
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                { item.Clicked } ({ getPercents(item.ClickedPercentages) })
                            </div>
                            <div className="col">
                                { item.uniqueUserClicked } ({getPercents(item.uniqueUserClickedPercentages)})
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                { item.Hovered } ({ getPercents(item.HoveredPercentages) })
                            </div>
                            <div className="col">
                                { item.uniqueUserHovered } ({ getPercents(item.uniqueUserHoveredPercentages) })
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                { item.Viewed } ({ getPercents(item.ViewedPercentages) })
                            </div>
                            <div className="col">
                                { item.uniqueUserViewed } ({ getPercents(item.uniqueUserViewedPercentages) })
                            </div>
                        </div>
                    </div>
                </div>

        )
    });
    }


    return (
        <div className="containerStatistics border p-2 m-3">
            <div className="row">
                <div className="col-2">
                    <div className="text-center">Test case ID</div>
                </div>
                <div className="col">
                    <div className="text-center">Totals</div>
                    <div className="row">
                        <div className="col border-left">
                            Totals generated
                        </div>
                        <div className="col border-left">
                            Unique users
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="text-center">Clicked</div>
                    <div className="row">
                        <div className="col border-left">
                            Absolute Values
                        </div>
                        <div className="col border-left">
                            User Group Values
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="text-center">Hovered</div>
                    <div className="row">
                        <div className="col border-left">
                            Absolute Values
                        </div>
                        <div className="col border-left">
                            User Group Values
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="text-center">Viewed</div>
                    <div className="row">
                        <div className="col border-left">
                            Absolute Values
                        </div>
                        <div className="col border-left">
                            User Group Values
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-top"></div>

            {elementsTable}
        </div>
    )
}

const mapState = ({ containers}) => {
    return { containers };
}


export default ContainersStatistic;
