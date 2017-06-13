inotifywait -m $(pwd)/videos_mp4 -e create -e moved_to |
    while read path action file; do
        echo "The file '$file' appeared in directory '$path' via '$action'"
        ffmpeg -i $(pwd)/videos_mp4/$file -acodec copy -vcodec copy 
-bsf:v 
h264_mp4toannexb -start_number 0 -hls_time 1 -hls_list_size 0 -f hls 
$(pwd)/videos_m3u8/$file.m3u8
    done
