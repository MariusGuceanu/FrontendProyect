const cnStateMachine = {
    REQUESTED: {
        transitions: {
            OFFERED: 'OFFERED',
            AGREED: 'AGREED',
            TERMINATED: 'TERMINATED',
        },
    },
    OFFERED: {
        transitions: {
            REQUESTED: 'REQUESTED',
            ACCEPTED: 'ACCEPTED',
            TERMINATED: 'TERMINATED',
        },
    },
    ACCEPTED: {
        transitions: {
            AGREED: 'AGREED',
            TERMINATED: 'TERMINATED',
        },
    },
    AGREED: {
        transitions: {
            VERIFIED: 'VERIFIED',
            TERMINATED: 'TERMINATED',
        },
    },
    VERIFIED: {
        transitions: {
            FINALIZED: 'FINALIZED',
            TERMINATED: 'TERMINATED',
        },
    },
    FINALIZED: {
        transitions: {
        },
    },
    TERMINATED: {
    },
};


export default cnStateMachine;

