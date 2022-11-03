import { PlayerActionTypes } from './Player.actions';
import { playerInitialState, playerStateReducer } from './Player.reducer';

describe('states/player', () => {
  describe('playerStateReducer', () => {
    test('should return current state for unknown actions', () => {
      const result = playerStateReducer(playerInitialState, {
        /* @ts-ignore */
        type: 'UNKNOWN_ACTION'
      });

      expect(result).toBe(playerInitialState);
    });

    describe('`playing` actions', () => {
      test('should set `playing` to true', () => {
        const result = playerStateReducer(
          {
            ...playerInitialState
          },
          {
            type: PlayerActionTypes.PLAYER_PLAY
          }
        );

        expect(result.playing).toBe(true);
      });

      test('should set `playing` to false', () => {
        const result = playerStateReducer(
          {
            ...playerInitialState,
            playing: true
          },
          {
            type: PlayerActionTypes.PLAYER_PAUSE
          }
        );

        expect(result.playing).toBe(false);
      });

      test('should toggle `playing`', () => {
        const result1 = playerStateReducer(
          {
            ...playerInitialState
          },
          {
            type: PlayerActionTypes.PLAYER_TOGGLE_PLAYING
          }
        );
        const result2 = playerStateReducer(
          {
            ...result1
          },
          {
            type: PlayerActionTypes.PLAYER_TOGGLE_PLAYING
          }
        );

        expect(result1.playing).toBe(true);
        expect(result2.playing).toBe(false);
      });
    });

    describe('`currentTime` actions', () => {
      test('should set `scrubPosition`', () => {
        const result = playerStateReducer(
          {
            ...playerInitialState
          },
          {
            type: PlayerActionTypes.PLAYER_UPDATE_CURRENT_TIME,
            payload: 0.25
          }
        );

        expect(result.currentTime).toBe(0.25);
      });
    });

    describe('`currentTrack` actions', () => {
      const mockState = {
        ...playerInitialState,
        currentTrackIndex: 0,
        tracks: [
          {
            guid: 'GUID:1',
            url: '//foo.com/1.mp3',
            link: '//foo.com/1',
            title: 'Title 1'
          },
          {
            guid: 'GUID:2',
            url: '//foo.com/2.mp3',
            link: '//foo.com/2',
            title: 'Title 2'
          },
          {
            guid: 'GUID:3',
            url: '//foo.com/3.mp3',
            link: '//foo.com/3',
            title: 'Title 3'
          }
        ]
      };

      test('should set `currentTrackIndex`', () => {
        const result1 = playerStateReducer(
          {
            ...mockState
          },
          {
            type: PlayerActionTypes.PLAYER_UPDATE_CURRENT_TRACK_INDEX,
            payload: 1
          }
        );
        const result2 = playerStateReducer(
          {
            ...mockState
          },
          {
            type: PlayerActionTypes.PLAYER_UPDATE_CURRENT_TRACK_INDEX,
            payload: -1
          }
        );
        const result3 = playerStateReducer(
          {
            ...mockState
          },
          {
            type: PlayerActionTypes.PLAYER_UPDATE_CURRENT_TRACK_INDEX,
            payload: 5
          }
        );

        expect(result1.currentTrackIndex).toBe(1);
        expect(result2.currentTrackIndex).toBe(0);
        expect(result3.currentTrackIndex).toBe(2);
      });

      test('should look up episode index and set `currentTrackIndex`', () => {
        const result1 = playerStateReducer(
          {
            ...mockState
          },
          {
            type: PlayerActionTypes.PLAYER_PLAY_EPISODE,
            payload: 'GUID:2'
          }
        );
        const result2 = playerStateReducer(
          {
            ...mockState
          },
          {
            type: PlayerActionTypes.PLAYER_PLAY_EPISODE,
            payload: 'NOT_THERE'
          }
        );

        expect(result1.currentTrackIndex).toBe(1);
        expect(result2.currentTrackIndex).toBe(0);
      });

      test('should set `currentTrackIndex`, and `playing` true', () => {
        const result = playerStateReducer(
          {
            ...mockState
          },
          {
            type: PlayerActionTypes.PLAYER_PLAY_TRACK,
            payload: 3
          }
        );

        expect(result.currentTrackIndex).toBe(3);
        expect(result.playing).toBe(true);
      });

      test('should set `currentTrackIndex` to index of audio in tracks, and `playing` true', () => {
        const result = playerStateReducer(
          {
            ...mockState
          },
          {
            type: PlayerActionTypes.PLAYER_PLAY_AUDIO,
            payload: mockState.tracks[1]
          }
        );

        expect(result.currentTrackIndex).toBe(1);
        expect(result.playing).toBe(true);
      });

      test('should prepend audio to tracks, set `currentTrackIndex` to 0, and `playing` true', () => {
        const mockTrack = {
          guid: '1337',
          url: 'http://foo.com/1337.mp3',
          link: 'http://foo.com/1337',
          title: 'Title 1337'
        };
        const result = playerStateReducer(
          {
            ...mockState,
            playing: true
          },
          {
            type: PlayerActionTypes.PLAYER_PLAY_AUDIO,
            payload: mockTrack
          }
        );

        expect(result.currentTrackIndex).toBe(0);
        expect(result.tracks[0].guid).toBe('1337');
        expect(result.playing).toBe(true);
      });

      test('should establish tracks, prepend audio to tracks, set `currentTrackIndex` to 0, and `playing` true', () => {
        const mockTrack = {
          guid: '1337',
          url: 'http://foo.com/1337.mp3',
          link: 'http://foo.com/1337',
          title: 'Title 1337'
        };
        const result = playerStateReducer(
          {
            ...mockState,
            tracks: null,
            playing: true
          },
          {
            type: PlayerActionTypes.PLAYER_PLAY_AUDIO,
            payload: mockTrack
          }
        );

        expect(result.tracks).toBeInstanceOf(Array);
        expect(result.currentTrackIndex).toBe(0);
        expect(result.tracks[0].guid).toBe('1337');
        expect(result.playing).toBe(true);
      });

      test('should append audio to tracks, set `currentTrackIndex` to last index, and `playing` true', () => {
        const mockTrack = {
          guid: '1337',
          url: 'http://foo.com/1337.mp3',
          link: 'http://foo.com/1337',
          title: 'Title 1337'
        };
        const result = playerStateReducer(
          {
            ...mockState,
            playing: false
          },
          {
            type: PlayerActionTypes.PLAYER_PLAY_AUDIO,
            payload: mockTrack
          }
        );
        const lastIndex = result.tracks.length - 1;

        expect(result.currentTrackIndex).toBe(lastIndex);
        expect(result.tracks[lastIndex].guid).toBe('1337');
        expect(result.playing).toBe(true);
      });

      test('should establish tracks, append audio to tracks, set `currentTrackIndex` to last index, and `playing` true', () => {
        const mockTrack = {
          guid: '1337',
          url: 'http://foo.com/1337.mp3',
          link: 'http://foo.com/1337',
          title: 'Title 1337'
        };
        const result = playerStateReducer(
          {
            ...mockState,
            tracks: null,
            playing: false
          },
          {
            type: PlayerActionTypes.PLAYER_PLAY_AUDIO,
            payload: mockTrack
          }
        );
        const lastIndex = result.tracks.length - 1;

        expect(result.tracks).toBeInstanceOf(Array);
        expect(result.currentTrackIndex).toBe(lastIndex);
        expect(result.tracks[lastIndex].guid).toBe('1337');
        expect(result.playing).toBe(true);
      });

      test('should set `currentTrackIndex` to next index', () => {
        const result = playerStateReducer(
          {
            ...mockState,
            currentTrackIndex: 1
          },
          {
            type: PlayerActionTypes.PLAYER_NEXT_TRACK
          }
        );

        expect(result.currentTrackIndex).toBe(2);
      });

      test('should set `currentTrackIndex` to next index, w/o wrapping', () => {
        const result = playerStateReducer(
          {
            ...mockState,
            currentTrackIndex: 2
          },
          {
            type: PlayerActionTypes.PLAYER_NEXT_TRACK
          }
        );

        expect(result.currentTrackIndex).toBe(2);
      });

      test('should set `currentTrackIndex` to previous index', () => {
        const result = playerStateReducer(
          {
            ...mockState,
            currentTrackIndex: 1
          },
          {
            type: PlayerActionTypes.PLAYER_PREVIOUS_TRACK
          }
        );

        expect(result.currentTrackIndex).toBe(0);
      });

      test('should set `currentTrackIndex` to previous index, w/o wrapping', () => {
        const result = playerStateReducer(
          {
            ...mockState,
            currentTrackIndex: 0
          },
          {
            type: PlayerActionTypes.PLAYER_PREVIOUS_TRACK
          }
        );

        expect(result.currentTrackIndex).toBe(0);
      });
    });

    describe('`tracks` actions', () => {
      test('should set `tracks`', () => {
        const mockTrack = {
          guid: '1',
          url: '//foo.com/1.mp3',
          link: '//foo.com/1',
          title: 'Title 1'
        };
        const result = playerStateReducer(
          {
            ...playerInitialState
          },
          {
            type: PlayerActionTypes.PLAYER_UPDATE_TRACKS,
            payload: [mockTrack]
          }
        );

        expect(result.tracks).not.toBeNull();
        expect(result.tracks[0]).toStrictEqual(mockTrack);
      });

      test('should set `tracks` and update `currentIndex`', () => {
        const mockTracks = [
          {
            guid: '1',
            url: '//foo.com/1.mp3',
            link: '//foo.com/1',
            title: 'Title 1'
          },
          {
            guid: '2',
            url: '//foo.com/2.mp3',
            link: '//foo.com/2',
            title: 'Title 2'
          }
        ];
        const mockTrack = {
          guid: '3',
          url: '//foo.com/3.mp3',
          link: '//foo.com/3',
          title: 'Title 3'
        };
        const result = playerStateReducer(
          {
            ...playerInitialState,
            tracks: [...mockTracks],
            currentTrackIndex: 1
          },
          {
            type: PlayerActionTypes.PLAYER_UPDATE_TRACKS,
            payload: [mockTrack, ...mockTracks]
          }
        );

        expect(result.tracks).not.toBeNull();
        expect(result.tracks[0]).toStrictEqual(mockTrack);
        expect(result.tracks[1]).toStrictEqual(mockTracks[0]);
        expect(result.tracks[2]).toStrictEqual(mockTracks[1]);
        expect(result.currentTrackIndex).toBe(2);
      });

      test('should set `tracks` and set `currentIndex` to 0', () => {
        const mockTracks = [
          {
            guid: '1',
            url: '//foo.com/1.mp3',
            link: '//foo.com/1',
            title: 'Title 1'
          },
          {
            guid: '2',
            url: '//foo.com/2.mp3',
            link: '//foo.com/2',
            title: 'Title 2'
          },
          {
            guid: '3',
            url: '//foo.com/3.mp3',
            link: '//foo.com/3',
            title: 'Title 3'
          }
        ];
        const result = playerStateReducer(
          {
            ...playerInitialState,
            tracks: [...mockTracks],
            currentTrackIndex: 1
          },
          {
            type: PlayerActionTypes.PLAYER_UPDATE_TRACKS,
            payload: [mockTracks[0], mockTracks[2]]
          }
        );

        expect(result.tracks).not.toBeNull();
        expect(result.tracks[0]).toStrictEqual(mockTracks[0]);
        expect(result.tracks[1]).toStrictEqual(mockTracks[2]);
        expect(result.currentTrackIndex).toBe(0);
      });
    });

    describe('`muted` actions', () => {
      test('should set `muted` to true', () => {
        const result = playerStateReducer(
          {
            ...playerInitialState
          },
          {
            type: PlayerActionTypes.PLAYER_MUTE
          }
        );

        expect(result.muted).toBe(true);
      });

      test('should set `muted` to false', () => {
        const result = playerStateReducer(
          {
            ...playerInitialState,
            muted: true
          },
          {
            type: PlayerActionTypes.PLAYER_UNMUTE
          }
        );

        expect(result.muted).toBe(false);
      });

      test('should toggle `muted`', () => {
        const result1 = playerStateReducer(
          {
            ...playerInitialState
          },
          {
            type: PlayerActionTypes.PLAYER_TOGGLE_MUTED
          }
        );
        const result2 = playerStateReducer(
          {
            ...result1
          },
          {
            type: PlayerActionTypes.PLAYER_TOGGLE_MUTED
          }
        );

        expect(result1.muted).toBe(true);
        expect(result2.muted).toBe(false);
      });
    });

    describe('`volume` actions', () => {
      test('should set `volume`', () => {
        const result = playerStateReducer(
          {
            ...playerInitialState
          },
          {
            type: PlayerActionTypes.PLAYER_UPDATE_VOLUME,
            payload: 0.25
          }
        );

        expect(result.volume).toBe(0.25);
      });
    });
  });
});
