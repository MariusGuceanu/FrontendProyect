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
    SUSPENDED: {
        transitions: {
            STARTED: 'STARTED',
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

