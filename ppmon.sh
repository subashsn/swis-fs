inotifywait -m /home/swis/swis-fs-r1/profilepic_raw -e create -e moved_to |
    while read path action file; do
        echo "The file '$file' appeared in directory '$path' via '$action'"
        convert /home/swis/swis-fs-r1/profilepic_raw/$file -resize 50x50 /home/swis/swis-fs-r1/profilepic_sort/s/$file
	convert /home/swis/swis-fs-r1/profilepic_raw/$file -resize 200x200 /home/swis/swis-fs-r1/profilepic_sort/m/$file
	convert /home/swis/swis-fs-r1/profilepic_raw/$file -resize 600x600 /home/swis/swis-fs-r1/profilepic_sort/l/$file
    done
