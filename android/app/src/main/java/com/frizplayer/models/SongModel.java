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

    public SongModel(long id, String title, String artist, String album) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.albumArt = ContentUris.withAppendedId(Uri.parse("content://media/external/audio/albumart"), this.id).toString();
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


}
