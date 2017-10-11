package com.frizplayer.models;

import android.content.ContentUris;
import android.net.Uri;

/**
 * Created by Princhaa on /10Oct/17.
 */

public class SongModel {

    private long id;
    private String title;
    private String artist;
    private String album;
    private String albumArt;
    private long songDuration;

    public SongModel(long id, String title, String artist, String album, long songDuration) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.albumArt = ContentUris.withAppendedId(Uri.parse("content://media/external/audio/albumart"), this.id).toString();
        this.songDuration = songDuration;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getArtist() {
        return artist;
    }

    public String getAlbum() {
        return album;
    }

    public String getAlbumArt() {
        return albumArt;
    }

    public String getSongDuration() {
        return milliSecondsToTimer(this.songDuration);
    }

    private String milliSecondsToTimer(long milliseconds) {
        String finalTimerString = "";
        String secondsString = "";

        // Convert total duration into time
        int hours = (int) (milliseconds / (1000 * 60 * 60));
        int minutes = (int) (milliseconds % (1000 * 60 * 60)) / (1000 * 60);
        int seconds = (int) ((milliseconds % (1000 * 60 * 60)) % (1000 * 60) / 1000);
        // Add hours if there
        if (hours > 0) {
            finalTimerString = hours + ":";
        }

        // Prepending 0 to seconds if it is one digit
        if (seconds < 10) {
            secondsString = "0" + seconds;
        } else {
            secondsString = "" + seconds;
        }

        finalTimerString = finalTimerString + minutes + ":" + secondsString;

        // return timer string
        return finalTimerString;
    }


}
