/**
 * @typedef {Object} AnimationTRS
 * @property {[number, number, number]} [translation]
 * @property {[number, number, number]} [rotation]
 * @property {[number, number, number]} [scale]
 */

/**
 * @typedef {Object} AnimationPath
 * @property {AnimationTRS} [keyframe]
 * @property {Object.<string, AnimationPath>} [children]
 */

/**
 * @typedef {Object} AnimationClip
 * @property {string} name
 * @property {AnimationPath[]} frames
 */

/** @type {AnimationClip} */

const hollowAnim = {
    name: "Hollow Object",
    frames: [
        // Frame 0
        {
            keyframe: {
                translation: [0, 0, 0],
                rotation: [0, 0, 0],
                scale: [1, 1, 1],
            },
            children: {
                RHead: {
                    keyframe: {
                        translation: [0, 0, 0],
                        rotation: [0, 15, 0],
                        scale: [1, 1, 1],
                    },
                },
                RTail: {
                    keyframe: {
                        translation: [0, 0, 0],
                        rotation: [0, 30, 10],
                        scale: [1, 1, 1],
                    },
                    children: {
                        RTailTip: {
                            keyframe: {
                                translation: [0, 0, 0],
                                rotation: [0, 40, 60],
                                scale: [1, 1, 1],
                            },
                        }
                    }
                }
            },
        },
        // Frame 1
        {
            keyframe: {
                translation: [0.1, 0, 0], // Slight translation along X-axis
                rotation: [45, 15, 10], // Combined rotation
                scale: [1, 1, 1],
            },
            children: {
                RHead: {
                    keyframe: {
                        translation: [0.1, 0, 0],
                        rotation: [45, 30, 45],
                        scale: [1, 1, 1],
                    },
                },
                RTail: {
                    keyframe: {
                        translation: [0.1, 0, 0],
                        rotation: [45, 60, 20],
                        scale: [1, 1, 1],
                    },
                    children: {
                        RTailTip: {
                            keyframe: {
                                translation: [0.1, 0, 0],
                                rotation: [45, 70, 70],
                                scale: [1, 1, 1],
                            },
                        }
                    }
                }
            },
        },
        // Frame 2
        {
            keyframe: {
                translation: [0, 0.1, 0], // Slight translation along Y-axis
                rotation: [90, 30, 20],
                scale: [1, 1, 1],
            },
            children: {
                RHead: {
                    keyframe: {
                        translation: [0, 0.1, 0],
                        rotation: [90, 45, 60],
                        scale: [1, 1, 1],
                    },
                },
                RTail: {
                    keyframe: {
                        translation: [0, 0.1, 0],
                        rotation: [90, 90, 30],
                        scale: [1, 1, 1],
                    },
                    children: {
                        RTailTip: {
                            keyframe: {
                                translation: [0, 0.1, 0],
                                rotation: [90, 100, 80],
                                scale: [1, 1, 1],
                            },
                        }
                    }
                }
            },
        },
        // Frame 3
        {
            keyframe: {
                translation: [0, 0, 0.1], // Slight translation along Z-axis
                rotation: [135, 45, 30],
                scale: [1, 1, 1],
            },
            children: {
                RHead: {
                    keyframe: {
                        translation: [0, 0, 0.1],
                        rotation: [135, 60, 75],
                        scale: [1, 1, 1],
                    },
                },
                RTail: {
                    keyframe: {
                        translation: [0, 0, 0.1],
                        rotation: [135, 120, 40],
                        scale: [1, 1, 1],
                    },
                    children: {
                        RTailTip: {
                            keyframe: {
                                translation: [0, 0, 0.1],
                                rotation: [135, 130, 90],
                                scale: [1, 1, 1],
                            },
                        }
                    }
                }
            },
        },
        // Frame 4
        {
            keyframe: {
                translation: [-0.1, 0, 0], // Slight translation along negative X-axis
                rotation: [180, 60, 40],
                scale: [1, 1, 1],
            },
            children: {
                RHead: {
                    keyframe: {
                        translation: [-0.1, 0, 0],
                        rotation: [180, 75, 90],
                        scale: [1, 1, 1],
                    },
                },
                RTail: {
                    keyframe: {
                        translation: [-0.1, 0, 0],
                        rotation: [180, 150, 50],
                        scale: [1, 1, 1],
                    },
                    children: {
                        RTailTip: {
                            keyframe: {
                                translation: [-0.1, 0, 0],
                                rotation: [180, 160, 100],
                                scale: [1, 1, 1],
                            },
                        }
                    }
                }
            },
        },
        // Frame 5
        {
            keyframe: {
                translation: [0, -0.1, 0], // Slight translation along negative Y-axis
                rotation: [225, 75, 50],
                scale: [1, 1, 1],
            },
            children: {
                RHead: {
                    keyframe: {
                        translation: [0, -0.1, 0],
                        rotation: [225, 90, 105],
                        scale: [1, 1, 1],
                    },
                },
                RTail: {
                    keyframe: {
                        translation: [0, -0.1, 0],
                        rotation: [225, 180, 60],
                        scale: [1, 1, 1],
                    },
                    children: {
                        RTailTip: {
                            keyframe: {
                                translation: [0, -0.1, 0],
                                rotation: [225, 190, 110],
                                scale: [1, 1, 1],
                            },
                        }
                    }
                }
            },
        },
        // Frame 6
        {
            keyframe: {
                translation: [0, 0, -0.1], // Slight translation along negative Z-axis
                rotation: [270, 90, 60],
                scale: [1, 1, 1],
            },
            children: {
                RHead: {
                    keyframe: {
                        translation: [0, 0, -0.1],
                        rotation: [270, 105, 120],
                        scale: [1, 1, 1],
                    },
                },
                RTail: {
                    keyframe: {
                        translation: [0, 0, -0.1],
                        rotation: [270, 210, 70],
                        scale: [1, 1, 1],
                    },
                    children: {
                        RTailTip: {
                            keyframe: {
                                translation: [0, 0, -0.1],
                                rotation: [270, 220, 120],
                                scale: [1, 1, 1],
                            },
                        }
                    }
                }
            },
        },
        // Frame 7
        {
            keyframe: {
                translation: [0, 0.1, 0.1], // Slight diagonal translation
                rotation: [315, 105, 70],
                scale: [1, 1, 1],
            },
            children: {
                RHead: {
                    keyframe: {
                        translation: [0, 0.1, 0.1],
                        rotation: [315, 120, 135],
                        scale: [1, 1, 1],
                    },
                },
                RTail: {
                    keyframe: {
                        translation: [0, 0.1, 0.1],
                        rotation: [315, 240, 80],
                        scale: [1, 1, 1],
                    },
                    children: {
                        RTailTip: {
                            keyframe: {
                                translation: [0, 0.1, 0.1],
                                rotation: [315, 250, 130],
                                scale: [1, 1, 1],
                            },
                        }
                    }
                }
            },
        },
        // Frame 8
        {
            keyframe: {
                translation: [0, 0, 0],
                rotation: [360, 120, 80],
                scale: [1, 1, 1],
            },
            children: {
                RHead: {
                    keyframe: {
                        translation: [0, 0, 0],
                        rotation: [0, 15, 0],
                        scale: [1, 1, 1],
                    },
                },
                RTail: {
                    keyframe: {
                        translation: [0, 0, 0],
                        rotation: [0, 30, 10],
                        scale: [1, 1, 1],
                    },
                    children: {
                        RTailTip: {
                            keyframe: {
                                translation: [0, 0, 0],
                                rotation: [0, 40, 60],
                                scale: [1, 1, 1],
                            },
                        }
                    }
                }
            },
        },
        // Frame 9
        {
            keyframe: {
                translation: [0, 0, 0],
                rotation: [360, 360, 360],
                scale: [1, 1, 1],
            },
            children: {
                RHead: {
                    keyframe: {
                        translation: [0, 0, 0],
                        rotation: [0, 60, 30],
                        scale: [1, 1, 1],
                    },
                },
                RTail: {
                    keyframe: {
                        translation: [0, 0, 0],
                        rotation: [0, 240, 240],
                        scale: [1, 1, 1],
                    },
                    children: {
                        RTailTip: {
                            keyframe: {
                                translation: [0, 0, 0],
                                rotation: [0, 120, 120],
                                scale: [1, 1, 1],
                            },
                        }
                    }
                }
            },
        }
    ],
};

