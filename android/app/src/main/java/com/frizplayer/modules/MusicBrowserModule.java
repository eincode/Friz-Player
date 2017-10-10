package com.frizplayer.modules;

import android.content.ContentResolver;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;
import android.telecom.Call;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.frizplayer.models.SongModel;
import com.google.gson.Gson;

import org.json.JSONArray;

import java.util.ArrayList;

/**
 * Created by Princhaa on /10Oct/17.
 */

public class MusicBrowserModule extends ReactContextBaseJavaModule {

    public MusicBrowserModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MusicBrowserModule";
    }

    @ReactMethod
    public void retreiveSongs(Callback callback) {
        ArrayList<SongModel> songs = new ArrayList<SongModel>();
        Gson gson = new Gson();
        ContentResolver musicResolver = getReactApplicationContext().getContentResolver();
        Uri musicUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
        JSONArray json = null;
        Cursor musicCursor = musicResolver.query(musicUri, null, MediaStore.Audio.Media.IS_MUSIC + " != 0", null, null);
        if (musicCursor != null && musicCursor.moveToFirst()) {
            //get columns
            int titleColumn = musicCursor.getColumnIndex(android.provider.MediaStore.Audio.Media.TITLE);
            int idColumn = musicCursor.getColumnIndex(MediaStore.Audio.Media.ALBUM_ID);
            int artistColumn = musicCursor.getColumnIndex(android.provider.MediaStore.Audio.Media.ARTIST);
            int albumColumn = musicCursor.getColumnIndex(MediaStore.Audio.Media.ALBUM);

            //add songs to list
            do {
                long thisId = musicCursor.getLong(idColumn);
                String thisTitle = musicCursor.getString(titleColumn);
                String thisArtist = musicCursor.getString(artistColumn);
                String thisAlbum = musicCursor.getString(albumColumn);
                songs.add(new SongModel(thisId, thisTitle, thisArtist, thisAlbum));
            } while(musicCursor.moveToNext());

            Log.d("WUT", songs.get(0).getTitle());

            //get JSON data
            callback.invoke(gson.toJson(songs));
        }
    }

}
