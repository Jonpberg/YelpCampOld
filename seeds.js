var mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment    = require('./models/comment');
    
var data = [
    {
        name: "Clouds Rest", 
        image: 'https://images.unsplash.com/reserve/wPCyys8TPCHY3GXm2N2D_ssp_inthewoods_1.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c080d30e55d277f0a77ef324b27dd262&auto=format&fit=crop&w=500&q=60', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus massa in maximus varius. Aliquam vitae purus quis sapien convallis rutrum sit amet vel lectus. Mauris dignissim a felis eget pharetra. Ut lacinia id massa ac rutrum. Phasellus mollis egestas magna, vel mattis arcu facilisis sit amet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean sem lectus, accumsan et molestie nec, congue eu purus. In consequat rhoncus facilisis. Integer non gravida mi. Vestibulum non turpis nec nisi egestas dignissim vel eu est. Sed ultrices suscipit augue placerat volutpat. Aenean dolor quam, porttitor a mattis nec, tincidunt pulvinar lectus. Phasellus viverra ex ut nulla condimentum faucibus. Aenean varius dapibus lorem, a hendrerit ipsum lacinia sed. Nulla ante tellus, volutpat et mollis a, fringilla non justo. Duis pharetra dui sed placerat sollicitudin.'
    },
    {
        name: "Forgotten Coves", 
        image: 'https://images.unsplash.com/photo-1488487418851-af30939c47ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=30712f1078569eee549d716b900396df&auto=format&fit=crop&w=500&q=60', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus massa in maximus varius. Aliquam vitae purus quis sapien convallis rutrum sit amet vel lectus. Mauris dignissim a felis eget pharetra. Ut lacinia id massa ac rutrum. Phasellus mollis egestas magna, vel mattis arcu facilisis sit amet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean sem lectus, accumsan et molestie nec, congue eu purus. In consequat rhoncus facilisis. Integer non gravida mi. Vestibulum non turpis nec nisi egestas dignissim vel eu est. Sed ultrices suscipit augue placerat volutpat. Aenean dolor quam, porttitor a mattis nec, tincidunt pulvinar lectus. Phasellus viverra ex ut nulla condimentum faucibus. Aenean varius dapibus lorem, a hendrerit ipsum lacinia sed. Nulla ante tellus, volutpat et mollis a, fringilla non justo. Duis pharetra dui sed placerat sollicitudin.'
    },
    {
        name: "Skys Tempest", 
        image: 'https://images.unsplash.com/photo-1506409192306-b368ff0c21eb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9b2b034a37f4325c424345698dc3c117&auto=format&fit=crop&w=500&q=60', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus massa in maximus varius. Aliquam vitae purus quis sapien convallis rutrum sit amet vel lectus. Mauris dignissim a felis eget pharetra. Ut lacinia id massa ac rutrum. Phasellus mollis egestas magna, vel mattis arcu facilisis sit amet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean sem lectus, accumsan et molestie nec, congue eu purus. In consequat rhoncus facilisis. Integer non gravida mi. Vestibulum non turpis nec nisi egestas dignissim vel eu est. Sed ultrices suscipit augue placerat volutpat. Aenean dolor quam, porttitor a mattis nec, tincidunt pulvinar lectus. Phasellus viverra ex ut nulla condimentum faucibus. Aenean varius dapibus lorem, a hendrerit ipsum lacinia sed. Nulla ante tellus, volutpat et mollis a, fringilla non justo. Duis pharetra dui sed placerat sollicitudin.'
    }, 
    {
        name: "Boreal Tundra",
        image: "https://images.unsplash.com/photo-1445607268922-c86255e164a3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=def5c8d55a141997bef3eb08c64a276e&auto=format&fit=crop&w=500&q=60",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus massa in maximus varius. Aliquam vitae purus quis sapien convallis rutrum sit amet vel lectus. Mauris dignissim a felis eget pharetra. Ut lacinia id massa ac rutrum. Phasellus mollis egestas magna, vel mattis arcu facilisis sit amet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean sem lectus, accumsan et molestie nec, congue eu purus. In consequat rhoncus facilisis. Integer non gravida mi. Vestibulum non turpis nec nisi egestas dignissim vel eu est. Sed ultrices suscipit augue placerat volutpat. Aenean dolor quam, porttitor a mattis nec, tincidunt pulvinar lectus. Phasellus viverra ex ut nulla condimentum faucibus. Aenean varius dapibus lorem, a hendrerit ipsum lacinia sed. Nulla ante tellus, volutpat et mollis a, fringilla non justo. Duis pharetra dui sed placerat sollicitudin.'
    }
];
    
    
function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log('Removed campgrounds.');
        //   Add a few campgrounds
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('added a campground');
                    // Add a few comments
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet.",
                            author: "Homer"
                        }, function (err, comment) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log('created new comment');
                            }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;