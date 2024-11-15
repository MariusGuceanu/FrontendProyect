const dtStateMachine = {
    REQUESTED: {
        transitions: {
            STARTED : 'STARTED',
            TERMINATED: 'TERMINATED',
        },
    },
    STARTED: {
        transitions: {
            SUSPENDED: 'SUSPENDED',
            COMPLETED: 'COMPLETED',
            TERMINATED: 'TERMINATED',
        },
    },
    STARTED2:{
        transitions: {
            SUSPENDED: 'SUSPENDED',
            COMPLETED: 'COMPLETED',
            TERMINATED: 'TERMINATED',
        }
    },
    SUSPENDED: {
        transitions: {
            STARTED2: 'STARTED2',
            TERMINATED: 'TERMINATED',
        },
    },
    COMPLETED: {
        // FINISHED
    },
    TERMINATED: {
        // FINISHED
    },
};


export default dtStateMachine;

