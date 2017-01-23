import frontmatter
import io
from os.path import basename, splitext
import glob

path = "*.md"

for fname in glob.glob(path):
    with io.open(fname, 'r') as f:
        post = frontmatter.load(f)
        if post.get('date') == '2016-09-25':
            post['date'] = "2016-01-01"
            newfile = io.open(fname, 'w', encoding='utf8')
            frontmatter.dump(post, newfile)
            newfile.close()


# for fname in glob.glob(path):
#     with io.open(fname, 'r') as f:
#         post = frontmatter.load(f)
#         if post.get('categories') == None:
#             post['categories'] = [post['mainclass']]
#             print(post['categories'])
#         else:
#             cat = post['categories']
#             main = post['mainclass']
#             if type(cat) == str:
#                 if cat.lower() != main:
#                     cat = [cat, main]
#             else:
#                 cat = [s.lower() for s in cat]
#                 if main in cat == False:
#                     cat.append(main)
#             post['categories'] = cat
#             print("%s") % (post['categories'])
#         newfile = io.open(fname, 'w', encoding='utf8')
#         frontmatter.dump(post, newfile)
#         newfile.close()
