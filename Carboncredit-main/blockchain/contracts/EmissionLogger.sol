// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EmissionLogger {

    struct EmissionData {
        uint256 timestamp;
        uint256 gas;
        uint256 dust;
        string status;
    }

    EmissionData[] public records;

    /* =========================================
       ADD RECORD (Called by Backend / IoT)
       ========================================= */
    function addRecord(
        uint256 _gas,
        uint256 _dust,
        string memory _status
    ) public {

        records.push(
            EmissionData(
                block.timestamp,
                _gas,
                _dust,
                _status
            )
        );
    }

    /* =========================================
       GET RECORD BY INDEX
       ========================================= */
    function getRecord(uint256 index)
        public
        view
        returns (EmissionData memory)
    {
        require(index < records.length, "Index out of range");
        return records[index];
    }

    /* =========================================
       TOTAL RECORD COUNT
       ========================================= */
    function getTotalRecords()
        public
        view
        returns (uint256)
    {
        return records.length;
    }
}
